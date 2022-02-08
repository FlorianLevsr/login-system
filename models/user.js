const mongoose = require('mongoose');
var { validate } = require("email-validator");
const argon2 = require('argon2');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: process.env.USERNAME_MIN_CHAR, //8
      maxlength: process.env.USERNAME_MAX_CHAR, //20
      unique: true,
      trim: true
    },
    email: {
      type: String,
      validate: [validate],
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: process.env.PASSWORD_MIN_CHAR // 6
    },
    validated: {
      type: Boolean,
      default: process.env.DEFAULT_VALIDATION_STATE //false
    },
    admin: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true
  }
);


userSchema.pre("save", async function (next) {

  // automatically hash stored passwords
  this.password = await argon2.hash(this.password, process.env.ARGON_SECRET_HASH);
  next();

});

userSchema.statics.login = async function (username, password) {

  let message;

  let user = await this.findOne({ username: username });
  
  if (!user) {
    throw Error ('Incorrect username');
  } else {
    const comparison = await argon2.verify(user.password, password);
    if (!comparison) throw Error ('Incorrect password');
    if (!user.validated) throw Error ('User has not been validated yet, please wait until an admin validates your account');
    user.password = undefined; //remove the password from returned data
  }

  return user;

};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
