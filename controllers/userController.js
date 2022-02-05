const UserModel = require('../models/user');

const userController = {

  getOneUser: async (req, res) => {

    try {
      const excludedFields = '-password -__v -updatedAt';
      const user = await UserModel.findById(req.params.id).select(excludedFields);
      res.status(200).json({ user });
    } catch (e) {
      res.status(500).json(err);
    }

  },

  getAllPendingSubscriptions: async (req, res) => {

    try {
      const filter = { validated: false };
      const excludedFields = '-password -__v';
      const users = await UserModel.find(filter).select(excludedFields);
      res.status(200).json({ users });
    } catch (e) {
      res.status(500).json(err);
    }

  },

  validateSubscription: async (req, res) => {

    try {
      const update = { validated: true };
      const options = { new: true };
      const excludedFields = '-password -__v -updatedAt';
      const user = await UserModel.findByIdAndUpdate(req.params.id, update, options).select(excludedFields);
      res.status(200).json({ message: 'Member successfully validated' });
    } catch (e) {
      res.status(500).json(err);
    }

  },

  refuseSubscription: async (req, res) => {

    try {
      const update = { validated: false };
      const options = { new: true };
      const excludedFields = '-password -__v -updatedAt';
      const user = await UserModel.findByIdAndUpdate(req.params.id, update, options).select(excludedFields);
      res.status(200).json({ message: 'Member successfully disabled' });
    } catch (e) {
      res.status(500).json(err);
    }

  },

};

module.exports = userController;