const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticateUser = catchAsyncErrors(async (req,res,next)=>{
  const {token} = req.cookies ;
    console.log("token  :", token)
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource",401))
  }

  const decodeData = jwt.verify(token, process.env.SECRET_KEY)

  req.user = User.findById(decodeData.id)
  console.log("decodeData  :",   decodeData)

  next()
})