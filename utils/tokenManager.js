const jwt = require('jsonwebtoken');

class JWTManager {

  constructor(user) {
    this.user = user;
  }

  generateToken = () => {
    const jwtToken = jwt.sign(
      { 
        user: this.user
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TOKEN_MAX_AGE }
    );
    this.userToken = jwtToken
    return jwtToken;
  }

}

module.exports = JWTManager;