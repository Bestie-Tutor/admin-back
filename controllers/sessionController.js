const sessionService = require("../services/sessionService");

exports.checkSession = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const isValid = await sessionService.verifySession(token);
    if (isValid) {
      return res.json({ success: true, msg: "Session is valid" });
    }
    return res.json({ success: false, msg: "Invalid session" });
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const token = req.body.token;
    await sessionService.invalidateSession(token);
    return res.json({ success: true, msg: "Session terminated" });
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};
