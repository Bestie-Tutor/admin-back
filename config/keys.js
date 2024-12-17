require('dotenv').config();

let dbPasswordProd = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

module.exports = {
  mongoURI: process.env.MONGO_URI_DEV || dbPasswordProd,
  secret: process.env.SECRET_KEY,
};
