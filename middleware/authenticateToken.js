const jwt = require('jsonwebtoken');

module.exports = {

  authenticateToken: (req, res, next) => {

    if (!req.headers['authorization'] || typeof req.headers['authorization'].split(' ')[1] === 'undefined') {

      return res.sendStatus(401); //unauthorized 

    } else {

      const token = req.headers['authorization'].split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {

        if (err) {
          res.cookie('jwt', '', { maxAge: 0 });
          return res.sendStatus(403); //forbidden
        } else {
          req.user = data.user;
          console.log('Authentication succeded - User: ', req.user.username, ' // id: ', req.user._id, ' // path: ', req.url); // log for demonstration purposes
          next();
        }

      });

    }
  }

};