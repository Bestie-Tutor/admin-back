require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI_DEV,
  secret: process.env.SECRET_KEY,
};
