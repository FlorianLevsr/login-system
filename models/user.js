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

  const user = await this.find({ username: username });

  if (!user[0]) {

    message = 'Incorrect username';

  } else {

    if (!user[0].validated) message = 'User has not been validated yet, please wait until an admin validates your account';
    const comparison = await argon2.verify(user[0].password, password);
    if (!comparison) message = 'Incorrect password';

  }

  user[0].password = undefined; //remove the password from returned data
  user[0].errorMessage = message;

  return user[0];

};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
