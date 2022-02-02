const jwt = require('jsonwebtoken');

module.exports = {

  authenticateToken: async (req, res, next) => {

    // if no auth bearer is provided or if the bearer is empty
    if (
      !req.headers['authorization'] ||
      typeof req.headers['authorization'].split(' ')[1] === 'undefined'
    ) {
      return res.sendStatus(401); //unauthorized 
    }

    const token = req.headers['authorization'].split(' ')[1];

    await jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {

      if (err) {
        res.cookie('jwt', '', { maxAge: 0 });
        return res.sendStatus(403); //forbidden
      };

      req.user = data.user;

    });

    // log for demonstration purposes
    console.log('Authentication succeded - User: ', req.user.username, ' // id: ', req.user._id, ' // path: ', req.url);

    next();
  }

};