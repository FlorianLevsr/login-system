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
  },
  {
    timestamps: true
  }
);


userSchema.pre("save", async function (next) {

  // automatically hash stored password
  this.password = await argon2.hash(this.password, process.env.ARGON_SECRET_HASH);
  next();

});

userSchema.statics.login = async function (username, password) {

  const user = await this.findOne({ username });
  if (!user) throw Error('Incorrect username');

  const comparison = await argon2.verify(user.password, password);
  if (!comparison) throw Error('Incorrect password');

  user.password = undefined;
  return user;

};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
