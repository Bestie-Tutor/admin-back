require('dotenv').config();

module.exports = {
  smtpConf: {
    host: 'smtp.googlemail.com',
    port: 465, 
    secure: true, 
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS, 
    },
  },
  webURL: process.env.WEB_URL, 
};
