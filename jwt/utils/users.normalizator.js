module.exports = {
  userNormalizator: (user) => {
    const wordToDelete = ['password'];
    user = user.toJSON();
    wordToDelete.forEach(word => {
      delete user[word];
    });

    return user;
  }
};

