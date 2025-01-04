const express = require("express");
const topicController = require("../controllers/topicController");
const reqAuth = require("../config/safeRoutes").reqAuth;

const router = express.Router();

router.get("/", reqAuth, topicController.getAllTopics);
router.get("/:topicId", reqAuth, topicController.getTopicById);
router.post("/", reqAuth, topicController.createTopic);
router.put("/:topicId", reqAuth, topicController.updateTopic);
router.delete("/:topicId", reqAuth, topicController.deleteTopic);

module.exports = router;
