module.exports = {

  adminRoleRequired: async (req, res, next) => {

    // mere mw that checks if the user is an admin or not
    // informations from admin are collected by the authenticateToken mw executed previously
    if(!req.user.admin) return res.sendStatus(401); // unauthorized

    //log for demonstration purposes
    console.log('User: ', req.user.username, '// Admin role OK - ', req.url, 'route authorized')

    next();
  }

};