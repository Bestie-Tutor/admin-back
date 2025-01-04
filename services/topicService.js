const Topic = require("../models/topic");

exports.getAllTopics = async () => {
  const totalTopics = await Topic.find().sort();
  if (totalTopics.length === 0) {
    throw new Error("주제가 존재하지 않습니다.");
  }
  return totalTopics;
};

exports.getTopicById = async (topicId) => {
  const topic = await Topic.findById(topicId);
  if (!topic || topic.length === 0) {
    throw new Error("주제를 찾을 수 없습니다.");
  }
  return topic;
};

exports.createTopic = async (topicData) => {
  const { mainTopic, subTopics } = topicData;
  if (!mainTopic || !subTopics) {
    throw new Error("대주제와 소주제가 필요합니다.");
  }

  const newTopic = new Topic({ mainTopic, subTopics });
  await newTopic.save();
  return newTopic;
};

exports.updateTopic = async (topicId, updateTopicData) => {
  const topic = await Topic.findById(topicId);
  if (!topic) {
    throw new Error("주제를 찾을 수 없습니다.");
  }
  const { mainTopic, subTopics } = updateTopicData;

  if (mainTopic !== undefined) {
    topic.mainTopic = mainTopic;
  }
  if (subTopics !== undefined) {
    topic.subTopics = subTopics;
  }

  await topic.save();
  return topic;
};

exports.deleteTopic = async (topicId) => {
  const result = await Topic.findByIdAndDelete(topicId);
  if (!result) {
    throw new Error("주제를 찾을 수 없습니다.");
  }
  return { success: true, msg: "주제가 삭제되었습니다." };
};
