const mongoose = require("mongoose");

const subTopicDifficultySchema = new mongoose.Schema({
  difficulty: {
    type: String,
    enum: ["easy", "normal", "hard"],
    required: true,
  },
  description: { type: String, required: true },
  detail: { type: String, required: true },
});

const subTopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulties: [subTopicDifficultySchema],
});

const topicSchema = new mongoose.Schema({
  mainTopic: { type: String, required: true },
  subTopics: [subTopicSchema],
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
