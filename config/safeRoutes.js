const ActiveSession = require("../models/activeSession");

const reqAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const session = await ActiveSession.find({ token });
    if (session.length === 1) {
      return next();
    } else {
      return res.json({ success: false, msg: "User is not logged on" });
    }
  } catch (err) {
    return res.json({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  reqAuth,
};
