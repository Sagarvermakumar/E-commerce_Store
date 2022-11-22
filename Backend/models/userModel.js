const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    minLength: [4, "Please Enteer your full name"],
    maxLength: [30, "name cannot exced 30 charactors"]
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email", 401);
      }
    }
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minlength: [8, "Password should be grater than 8 charactors"],
    select: false
  },
  avtar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: "User"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});


//hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  // console.log(`"hasing password : "${this.password}`);
});


// Genrate JWT token
userSchema.methods.getJWTToken = function() {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000,
  });
}
//$2b$10$XXYFAcC954x1MLFhfsxq8e/twQRPYEK5K1z2RqOfePwXtEDO1oQbq

//compare password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}





//Genrating Password Reset Token
userSchema.methods.getResetPasswordToken = async function() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetpasswordExpire = Date.now() + 10 * 60 * 1000; //10 min

  return resetToken;
}


const user = new mongoose.model("user", userSchema);
module.exports = user;