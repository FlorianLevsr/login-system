const jwt = require('jsonwebtoken');

module.exports = {

  // I have decided to implement this mw rather than a global middleware which would have retrieved sent cookies from client on each request
  // in order to isolate the "deny access to already logged users" logic before the request handling instead of putting it into every concerned controllers

  denyAccessToLoggedUsers: (req, res, next) => {

    // if a jwt cookie is sent by client
    if (req.cookies['jwt']) {

      const token = req.cookies['jwt']

      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {

        // if  token is invalid for any reason, this means that user isn't authenticated anyway. 
        // In that specific case, we still allow them to perform request 
        if (!err) {
          return res.status(400).json({ message: 'User already logged in.' }) // bad request
        }

      });

    } else {
      next();
    }

  }

};