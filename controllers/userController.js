const UserModel = require('../models/user');

const userController = {

  getOneUser: async (req, res) => {

    try {
      const user = await UserModel.findById(req.params.id).select('-password');
      res.status(200).json({ user });
    } catch (e) {
      res.status(500).json(err);
    }

  },

  getAllPendingSubscriptions: async (req, res) => {

    try {
      const filter = { validated: false };
      const users = await UserModel.find(filter).select('-password');
      res.status(200).json({ users });
    } catch (e) {
      res.status(500).json(err);
    }

  },

  validateSubscription: async (req, res) => {

    try {
      const update = { validated: true };
      const options = { new: true };
      const user = await UserModel.findByIdAndUpdate(req.params.id, update, options).select('-password');
      res.status(200).json({ message: 'Member successfully validated', user });
    } catch (e) {
      res.status(500).json(err);
    }

  },

  refuseSubscription: async (req, res) => {

    // considering that new subscribers already have the validated attribute set automatically to false when signing up
    // this method may appear useless and yet it allows an admin to remove the access of an already validated user if needed
    // so, it should be named 'banValidatedMember' instead but I kept its current name to avoid confusion and/or in case of future changes
    try {
      const update = { validated: false };
      const options = { new: true };
      const user = await UserModel.findByIdAndUpdate(req.params.id, update, options).select('-password');
      res.status(200).json({ message: 'Member successfully disabled', user });
    } catch (e) {
      res.status(500).json(err);
    }

  },

};

module.exports = userController;