const express = require('express');
const { registerUser,
  loginUser,
  getAllUsers,
  getsingleUser,
  logout,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword } = require('../controller/userController');

const userRouter = express.Router();

const {isAuthenticateUser}  = require('../middleware/authentication')


userRouter.route('/register').post(registerUser);

userRouter.route('/login').post(loginUser);

userRouter.route('/password/forget').post(forgetPassword);

userRouter.route('/password/reset/:token').put(resetPassword);

userRouter.route('/logout').get(logout);


userRouter.route('/me').get(isAuthenticateUser, getUserDetails);


userRouter.route('/users').get(getAllUsers);
userRouter.route('/user/:id').get(getsingleUser);
// userRouter.route('/password/update').get(updatePassword);


module.exports = userRouter; 