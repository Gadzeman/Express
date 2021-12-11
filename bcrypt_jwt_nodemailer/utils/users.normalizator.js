module.exports = {
  normalizeUser: (user, ...wordsToDelete) => {
    user = user.toJSON();
    wordsToDelete.forEach(word => {
      delete user[word];
    });

    return user;
  }
};
