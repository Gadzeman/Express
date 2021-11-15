const ErrorHandler = require('../errors/error.handler');
const Post = require('../db/Post');
const { postsValidator } = require('../validators');
const { USER } = require('../config/db.tables.enum');

module.exports = {
  getPostsByDynamicParams: (paramName, searchIn = 'body', dbField = paramName) =>
    async (req, res, next) =>
    {
      try {
        req.posts = await Post.find({ [dbField]: req[searchIn][paramName] }).populate( USER );

        next();
      } catch (e) {
        next(e);
      }
    },
  validatePostBody: (req, res, next) => {
    try {
      const { error } = postsValidator.validate(req.body);

      if ( error ) {
        throw new ErrorHandler(400, error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
};
