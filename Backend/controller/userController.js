const User = require("../models/userModel");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/sendToken');
const sendMail = require('../utils/sendEmail');
const crypto = require('crypto');

//create new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avtar: {
      public_id: "this is public id",
      url: "profilr pic url"
    }
  });
  res.status(201).send({
    success: true,
    user
  });
  sendToken(user, 200, res);//when user register then default Login
  await user.save();
});


//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(new ErrorHandler("Enter Email & password", 401));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return (next(new ErrorHandler("User not found", 404)))
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return (next(new ErrorHandler("Enter valid password ", 404)))
  }
  sendToken(user, 200, res);
});



//get all users (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find();
  if (!user) {
    return next(new ErrorHandler("User not found ", 500));
  }
  res.status(200).json({
    success: true,
    user

  })
});


//get single user (admin)
exports.getsingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User does  not exist with this id ${req.params.id} `, 500));
  }
  res.status(200).json({
    success: true,
    user

  })
});



//user logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });
  res.status(200).json({
    success: true,
    messsage: "Logged Out"
  });
});


//forget password
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
  //find user 
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found Enter valid email", 404))
  }

  //get reset password token
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validaterBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n If You have not requested this mail then , ignore it`;
  // console.log(message)


  try {
    await sendMail({
      email: user.mail,
      subject: `Ecommerce Password Recovery`,
      message
    });
    res.status(200).json({
      success: true,
      message: `email send to ${user.email} Successfully`
    })

  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetpasswordExpire = undefined;


    await user.save({ validBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }

});


//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token F
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  console.log(resetPasswordToken)
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorHandler("Reset password Token is invalid or has been Expire", 400));
  }
  if (!req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Does not match confirm Password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});



// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(user)

  res.status(200).json({
    success: true,
    user,
  });
});


// //update user password

// exports.updatePassword = cathAsyncErrors(async (req, res, next) => {
//     const _id = req.user.id;
//     const user = await User.findOne({ _id }).select("+password");

//     const isPasswordMatched = await user.comparePasswod(req.body.oldPassword);
//     // console.log(isPasswordMatched);
//     if (!isPasswordMatched) {
//         return next(new ErrorHandler("Old password is incorect", 400));
//     }

//     if (req.body.newPassword !== req.body.confirmPassword) {
//         return next(new ErrorHandler("password does not matched", 400));
//     }

//     user.password = req.body.newPassword;
//     await user.save();

//     sendToken(user, 200, res);
// });
