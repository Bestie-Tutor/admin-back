const topicService = require("../services/topicService");

exports.getAllTopics = async (req, res) => {
  try {
    const totalTopics = await topicService.getAllTopics();
    return res.json(totalTopics);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

exports.getTopicById = async (req, res) => {
  try {
    const topicId = req.params;
    const topic = await topicService.getTopicById(topicId);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

exports.createTopic = async (req, res) => {
  const topicData = req.body;
  try {
    const newTopic = await topicService.createTopic(topicData);
    return res.json(newTopic);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

exports.updateTopic = async (req, res) => {
  const { topicId } = req.params;
  const updateTopicData = req.body;
  try {
    const updatedTopic = await topicService.updateTopic(
      topicId,
      updateTopicData
    );
    return res.json(updatedTopic);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

exports.deleteTopic = async (req, res) => {
  const { topicId } = req.params;
  try {
    const result = await topicService.deleteTopic(topicId);
    return res.json(result);
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};
