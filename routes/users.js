const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const User = require('../models/User');
const ActiveSession = require('../models/activeSession');
const reqAuth = require('../config/safeRoutes').reqAuth;
const {smtpConf} = require('../config/config');
// route /admin/users/

/* 회원 관리 */ 
// 전체 사용자 조회
router.post('/all', reqAuth, function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.json({success: false});
    }
    users = users.map(function(item) {
      const x = item;
      x.password = undefined;
      x.__v = undefined;
      return x;
    });
    res.json({success: true, users: users});
  });
});

// 사용자 정보 수정
router.post('/edit', reqAuth, function(req, res) {
  const {userID, name, email} = req.body;

  User.find({_id: userID}).then((user) => {
    if (user.length == 1) {
      const query = {_id: user[0]._id};
      const newvalues = {$set: {name: name, email: email}};
      User.updateOne(query, newvalues, function(err, cb) {
        if (err) {
          // eslint-disable-next-line max-len
          res.json({success: false, msg: 'There was an error. Please contract the administator'});
        }
        res.json({success: true});
      });
    } else {
      res.json({success: false});
    }
  });
});

/* 비밀번호 관리 */
// 비밀번호 재설정 요청 확인
router.post('/check/resetpass/:id', (req, res) => {
  const userID = req.params.id;
  User.find({_id: userID}).then((user) => {
    if (user.length == 1 && user[0].resetPass == true) {
      res.json({success: true}); // reset password was made for this user
    } else {
      res.json({success: false});
    }
  });
});

// 비밀번호 초기화 요청
router.post('/resetpass/:id', (req, res) => {
  const errors = [];
  const userID = req.params.id;

  let {password} = req.body;

  if (password.length < 6) {
    errors.push({msg: 'Password must be at least 6 characters'});
  }
  if (errors.length > 0) {
    res.json({success: false, msg: errors});
  } else {
    const query = {_id: userID};
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) throw err;
        password = hash;
        const newvalues = {$set: {resetPass: false, password: password}};
        User.updateOne(query, newvalues, function(err, usr) {
          if (err) {
            res.json({success: false, msg: err});
          }
          res.json({success: true});
        });
      });
    });
  }
});

// 비밀번호 재설정 요청
router.post('/forgotpassword', (req, res) => {
  const {email} = req.body;
  const errors = [];

  if (!email) {
    errors.push({msg: 'Please enter all fields'});
  }
  User.find({email: email}).then((user) => {
    if (user.length != 1) {
      errors.push({msg: 'Email Address does not exist'});
    }
    if (errors.length > 0) {
      res.json({success: false, errors: errors});
    } else {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport(smtpConf);

      const query = {_id: user[0]._id};
      const newvalues = {$set: {resetPass: true}};
      User.updateOne(query, newvalues, function(err, usr) {});

      // don't send emails if it is in demo mode
      if (process.env.DEMO != 'yes') {
        // send mail with defined transport object
        transporter.sendMail({
          from: '"Creative Tim" <' + smtpConf.auth.user + '>', // sender address
          to: email, // list of receivers
          subject: 'Creative Tim Reset Password', // Subject line
          // eslint-disable-next-line max-len
          html: '<h1>Hey,</h1><br><p>If you want to reset your password, please click on the following link:</p><p><a href="' + 'http://localhost:3000/auth/confirm-password/' + user._id + '">"' + 'http://localhost:3000/auth/confirm-email/' + user._id + + '"</a><br><br>If you did not ask for it, please let us know immediately at <a href="mailto:' + smtpConf.auth.user + '">' + smtpConf.auth.user + '</a></p>', // html body
        });
        res.json({success: true});
      }
      res.json({success: true, userID: user[0]._id});
    }
  });
});

/* 회원가입 및 로그인 */
// 회원가입
router.post('/register', (req, res) => {
  const {name, email, password} = req.body;

  User.findOne({email: email}).then((user) => {
    if (user) {
      res.json({success: false, msg: 'Email already exists'});
    } else if (password.length < 6) {
      // eslint-disable-next-line max-len
      res.json({success: false, msg: 'Password must be at least 6 characters long'});
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (err) throw err;
          const query = {name: name, email: email,
            password: hash};
          User.create(query, function(err, user) {
            if (err) throw err;

            const transporter = nodemailer.createTransport(smtpConf);

            // don't send emails if it is in demo mode
            if (process.env.DEMO != 'yes') {
            // send mail with defined transport object
              transporter.sendMail({
                from: '"Creative Tim" <' + smtpConf.auth.user + '>',
                to: email, // list of receivers
                subject: 'Creative Tim Confirm Account', // Subject line
                // eslint-disable-next-line max-len
                html: '<h1>Hey,</h1><br><p>Confirm your new account </p><p><a href="' + 'http://localhost:3000/auth/confirm-email/' + user._id + '">"' + 'http://localhost:3000/auth/confirm-email/' + user._id + '"</a><br><br>If you did not ask for it, please let us know immediately at <a href="mailto:' + smtpConf.auth.user + '">' + smtpConf.auth.user + '</a></p>', // html body
              });
              // eslint-disable-next-line max-len
              res.json({success: true, msg: 'The user was succesfully registered'});
            }
            // eslint-disable-next-line max-len
            res.json({success: true, userID: user._id, msg: 'The user was succesfully registered'});
          });
        });
      });
    }
  });
});

router.post('/confirm/:id', (req, res) => {
  const userID = req.params.id;

  const query = {_id: userID};

  const newvalues = {$set: {accountConfirmation: true}};
  User.updateOne(query, newvalues, function(err, usr) {
    if (err) {
      res.json({success: false});
    }
    res.json({success: true});
  });
});

// 로그인
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email}, (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.json({success: false, msg: 'Wrong credentials'});
    }

    if (!user.accountConfirmation) {
      return res.json({success: false, msg: 'Account is not confirmed'});
    }

    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 86400, // 1 week
        });
        // Don't include the password in the returned user object
        const query = {userId: user._id, token: 'JWT ' + token};
        ActiveSession.create(query, function(err, cd) {
          user.password = null;
          user.__v = null;
          return res.json({
            success: true,
            token: 'JWT ' + token,
            user,
          });
        });
      } else {
        return res.json({success: false, msg: 'Wrong credentials'});
      }
    });
  });
});

/* 세션 관리 */
// 세션 확인
router.post('/checkSession', reqAuth, function(req, res) {
  res.json({success: true});
});

// 로그아웃
router.post('/logout', reqAuth, function(req, res) {
  const token = req.body.token;
  ActiveSession.deleteMany({token: token}, function(err, item) {
    if (err) {
      res.json({success: false});
    }
    res.json({success: true});
  });
});


module.exports = router;
