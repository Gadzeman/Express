module.exports = {
  userNormalizator: (user) => {
    const wordToDelete = ['password', '__v', 'createdAt', 'updatedAt'];
    wordToDelete.forEach(word => {
      delete user[word];
    });

    return user;
  }
};

