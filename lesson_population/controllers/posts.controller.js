const Post = require('../db/Post');

module.exports = {
  getPosts: (req, res, next) => {
    try {
      const { posts } = req;

      if ( posts.length === 0 ) {
        res.json({ message: 'This user has not created any posts yet' });
      }

      res.json(posts);
    } catch (e) {
      next(e);
    }
  },
  createPost: async (req, res, next) => {
    try {
      const createdPost = await Post.create(req.body);

      res.json(createdPost);
    } catch (e) {
      next(e);
    }
  }
};
