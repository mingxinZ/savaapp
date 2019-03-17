var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Shares = require('../models/shares');
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

router.get('/', (req, res, next) => {
  Shares.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: 'finding failed'
      })
    } else {
      res.json({
        status: '0',
        msg: 'finding successed',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

router.post('/add', (req, res, next) => {
  let params = {
    "username": req.body.username,
    "usershare": req.body.text,
    "usericon": req.body.avatar
  }
  Shares.create(params, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: 'creating failed'
      })
    } else {
      res.json({
        status: '0',
        msg: 'creating successed',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router