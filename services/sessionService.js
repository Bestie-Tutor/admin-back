const ActiveSession = require('../models/activeSession');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

const verifySession = async (token) => {
  try {
    if (!token) throw new Error('Token is required');
    const decoded = jwt.verify(token, config.secret); // 토큰 검증
    const session = await ActiveSession.findOne({ token: `JWT ${token}` });
    if (!session) {
      throw new Error('Session not found or expired');
    }
    return true; // 유효한 세션
  } catch (err) {
    return false; // 유효하지 않은 세션
  }
};

const invalidateSession = async (token) => {
  if (!token) throw new Error('Token is required');
  await ActiveSession.deleteOne({ token: `JWT ${token}` });
};

const cleanUpSessions = async () => {
  const date = new Date();
  const daysToDelete = 1;
  const deletionDate = new Date(date.setDate(date.getDate() - daysToDelete));
  await ActiveSession.deleteMany({ date: { $lt: deletionDate } }); // 오래된 세션 삭제
};

module.exports = {
  verifySession,
  invalidateSession,
  cleanUpSessions,
};
