var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/users');
mongoose.connect('mongodb://47.107.110.244:27017/music');
mongoose.connection.on('connected', function () {
  console.log('mongodb connected');
})
mongoose.connection.on('error', function () {
  console.log('mongodb error');
})
mongoose.connection.on('disconnected', function () {
  console.log('mongodb disconnected');
})
/* GET users listing. */
// console.log('why')
router.get('/', function(req, res, next) {
  Users.find({}, function(err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});

router.post('/login', (req, res, next) => {
  console.log(req.body)
  let param = {
    username: req.body.username,
    pwd: req.body.password
  }
  Users.find(param, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.cookie('userId', doc._id, {
        path: '/',
        maxAge: 1000 * 60 * 60
      })
      // req.session.user = doc
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })                                                        
})

router.post('/signin', (req, res, next) => {
  let param = {
    username: req.body.username,
    pwd: req.body.password
  }
  Users.find({username: req.body.username}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else if (doc.length === 0) {
      const register = new Users(param)
      Users.create(register, (err, doc) => {
        if (err) {
          console.log(err)
        } else {
          console.log(doc)
        }
        res.cookie('userId', doc._id, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.json({
          status: '0',
          msg: '',
          result: {
            count: doc.length,
            list: doc
          }
        })
      })
    } else {
      res.json({
        status: '1',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

router.post('/avatar', (req, res, next) => {
  Users.updateOne({username: req.body.username}, {$set:{usericon: req.body.avatarurl}}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '1',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router