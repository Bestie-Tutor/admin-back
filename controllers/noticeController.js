const noticeService = require('../services/noticeService');

exports.getNotices = async (req, res) => {
  try {
    const result = await noticeService.getNotices();
    return res.json(result);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

exports.getNotice = async (req, res) => {
  const { noticeId } = req.params;
  try {
    const result = await noticeService.getNotice(noticeId);
    return res.json(result);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

exports.createNotice = async (req, res) => {
  const noticeData = req.body;
  try {
    const result = await noticeService.createNotice(noticeData);
    return res.json(result);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

exports.updateNotice = async (req, res) => {
  const { noticeId } = req.params;
  const updateNoticeData = req.body;
  try {
    const result = await noticeService.updateNotice(noticeId, updateNoticeData);
    return res.json(result);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

exports.deleteNotice = async (req, res) => {
  const { noticeId } = req.params;
  try {
    const result = await noticeService.deleteNotice(noticeId);
    return res.json(result);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};
