const User = require('../models/User');

// 전체 회원 조회 및 필터링
exports.getUsers = async (status, page = 1, limit = 10) => {
  let filter = {};

  if (status === 'active') {
    filter = { isDeleted: false, isBanned: false };
  } else if (status === 'deleted') {
    filter = { isDeleted: true };
  } else if (status === 'banned') {
    filter = { isBanned: true };
  }

  const users = await User.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .select('-password -__v');

  const total = await User.countDocuments(filter);

  return { users, total };
};

// 회원 강제 탈퇴
exports.banUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    return { success: false, msg: 'User not found' };
  }

  if (user.isBanned) {
    return { success: false, msg: 'User is already banned' };
  }

  user.isBanned = true;
  user.isDeleted = true;
  user.deletedAt = new Date();
  await user.save();

  return { success: true, msg: 'User has been banned successfully' };
};
