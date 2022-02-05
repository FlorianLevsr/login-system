module.exports = {

  // mere mw that checks if the user is an admin or not
  // informations from user are collected by the authenticateToken mw executed previously
  
  adminRoleRequired: (req, res, next) => {

    if (!req.user.admin) {
      return res.status(401).json({ message: 'User must have admin role' }); // unauthorized
    } else {
      console.log('User: ', req.user.username, '// Admin role OK - ', req.url, 'route authorized'); //log for demonstration purposes
      next();
    }

  }

};