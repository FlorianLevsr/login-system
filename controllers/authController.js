const UserModel = require('../models/user');
const JWTManager = require('../utils/tokenManager');

const authController = {

  signUp: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log('signUp method: ', req.body);
      const user = await UserModel.create({ username, email, password });
      res.status(200).json({ message: 'User successfully created' });

    } catch (err) {

      res.status(500).json(err)

    };

  },

  signIn: async (req, res) => {
    try {

      const { username, password } = req.body;
      const user = await UserModel.login(username, password);
      if (user.validated) {
        // a jwt is generated then given to the successfully authenticated user thanks to a public cookie
        // user informations except their password (see schema static login method) is stored in the jwt payload 
        // authenticated users will then use the value of this cookie as an auth Bearer for next requests
        const jwtToken = new JWTManager(user);
        res.cookie('jwt', jwtToken.generateToken(), { maxAge: process.env.COOKIE_MAX_AGE });
      }

      res.status(200).json({ message: user.errorMessage || 'User successfully logged in' });

    } catch (err) {

      res.status(500).json({message: err})

    };

  },

  signOut: async (_, res) => {

    // erase cookie value & set maxAge age to 0 in order to remove the cookie from the user's browser
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'User successfully logged out' })

  },

};

module.exports = authController;