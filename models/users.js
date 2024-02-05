const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['ADMIN_ROLE', 'USER_ROLE'], required: true },
  active: { type: Boolean, default: true },
});

userSchema.methods.toJSON = function() {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

const User = mongoose.model('User', userSchema);


module.exports = User;
