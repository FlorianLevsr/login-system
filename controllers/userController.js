

const userController = {

  getOneUser: async (req, res) => {

    // TODO - fetch user from db by id
    try {
      res.status(200).json({ message: 'getOneuser' });
    } catch (e) {
      res.status(500).json(err);
    }

  },

  getAllPendingSubscriptions: async (req, res) => {

    // TODO - fetch all subs from db with pending attribute true
    try {
      res.status(200).json({ message: 'getAllPendingSubscriptions' });
    } catch (e) {
      res.status(500).json(err);
    }

  },

  validateSubscription: async (req, res) => {

    // TODO - fetch user then allow them (by modifying 'allowed_attribute' boolean to true, for eg )
    try {
      res.status(200).json({ message: 'validateSubscription' });
    } catch (e) {
      res.status(500).json(err);
    }

  },

  refuseSubscription: async (req, res) => {

    // TODO - fetch user then refuse them (by modifying 'allowed_attribute' boolean to false, for eg )
    try {
      res.status(200).json({ message: 'refuseSubscription' });
    } catch (e) {
      res.status(500).json(err);
    }

  },


};

module.exports = userController;