const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  preferenceCompleted: { type: Boolean, defaut: false },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  kakaoId: { type: String, unique: true }, 
  total_time: { type: Number, default: 0 },
  role: { type: String, default: 'user', enum: ['user', 'admin'] }, 
  isDeleted: { type: Boolean, default: false }, 
  isBanned: { type: Boolean, default: false }, 
  deletedAt: { type: Date, default: null }, 
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;