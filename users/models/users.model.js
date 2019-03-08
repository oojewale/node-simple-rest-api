const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
});

const userModel = mongoose.model('Users', userSchema);

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
}

exports.findBy = (id) => {
  return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  })
};

exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err,  user) => {
      if (err) reject(err);
      for (let i in userData) {
        user[i] = userData[i];
      }
      user.save((err, updatedUser) => {
        if(err) return reject(err);
        resolve(updatedUser);
      });
    });
  });
};
