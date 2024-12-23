const sessionService = require('../services/sessionService');

const tokensCleanUp = async () => {
  try {
    await sessionService.cleanUpSessions();
    console.log('Old sessions cleaned up successfully');
  } catch (err) {
    console.error('Error cleaning up sessions:', err.message);
  }
};

module.exports = {
  tokensCleanUp,
};
