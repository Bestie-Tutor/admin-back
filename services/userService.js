const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ActiveSession = require("../models/activeSession");
const config = require("../config/keys");

exports.registerUser = async (name, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Email already exists");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  try {
    const lastUser = await User.findOne().sort({ userId: -1 });
    const newUserId = lastUser ? lastUser.userId + 1 : 0;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId: newUserId,
      name,
      email,
      password: hashedPassword,
      nickname: name,
      preferenceCompleted: true,
      phone: "010-0000-0000",
      gender: "hidden",
      address: "Seoul",
      kakaoId: newUserId,
      role: "admin",
      isDeleted: false,
      isBanned: false,
      deletedAt: null,
    });
    await newUser.save();

    return { success: true, msg: "User registered successfully" };
  } catch (err) {
    console.log(err);
    throw new Error("Error registering user");
  }
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Wrong credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Wrong credentials");
  }

  const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: "1d" });
  await ActiveSession.create({ userId: user._id, token });

  user.password = undefined;
  return { success: true, token: `JWT ${token}`, user };
};

exports.getUsers = async () => {
  const users = await User.find();
  if (!users) {
    throw new Error("존재하는 사용자가 없습니다.");
  }
  const filteredUsers = users.map((user) => ({
    email: user.email,
    nickname: user.nickname,
    phone: user.phone,
    gender: user.gender,
    address: user.address,
    create_date: user.createdAt,
    preferences: user.preferenceCompleted,
  }));
  return { filteredUsers };
};
