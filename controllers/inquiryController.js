const inquiryService = require('../services/inquiryService');

exports.createReply = async (req, res) => {
  const { inquiryId } = req.params;
  const replyData = req.body;
  try {
    const result = await inquiryService.createReply(inquiryId, replyData);
    return res.json(result);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};
