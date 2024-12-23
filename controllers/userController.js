const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await userService.registerUser(name, email, password);
        return res.json(result);
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await userService.loginUser(email, password);
        return res.json(result);
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
};