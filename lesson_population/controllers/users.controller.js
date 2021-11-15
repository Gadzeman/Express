const User = require('../db/User');

module.exports = {
  getUser: ( req, res, next ) => {
    try {
      const { user } = req;

      res.json( user );
    } catch (e) {
      next(e);
    }
  },
  createUser: async ( req, res, next ) => {
    try {
      const createdUser = await User.create( req.body );

      res.json( createdUser );
    } catch (e) {
      next(e);
    }
  }
};
