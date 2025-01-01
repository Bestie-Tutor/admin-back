const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const CronJob = require("cron").CronJob;
const crons = require("./config/crons");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL_DEV)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const sessionCleanupJob = new CronJob("10 3 * * *", () => {
  crons.tokensCleanUp();
});
sessionCleanupJob.start();

app.use("/admin/users", userRoutes);
app.use("/admin/users", sessionRoutes);
app.use("/admin/notices", noticeRoutes);
app.use("/admin/inquiries", inquiryRoutes);
