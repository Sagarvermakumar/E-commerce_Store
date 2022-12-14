//creating token & saving cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
   console.log("jwt token", token)
  //options for cookies
  let options = {
    expries: new Date(
      Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    message: "Login successfully",
    user,
    token
  });
}

module.exports = sendToken;