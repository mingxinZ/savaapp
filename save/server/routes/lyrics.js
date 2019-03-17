var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Lyrics = require('../models/lyrics')

mongoose.connect('mongodb://47.107.110.244:27017/music')

mongoose.connection.on('connected', ()=>{
  console.log('mongodb connected')
})
mongoose.connection.on('error', ()=>{
  console.log('mongodb error')
})
mongoose.connection.on('disconnected', ()=>{
  console.log('mongodb disconnected')
})

router.get('/', (req, res, next) => {
  Lyrics.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
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
})

module.exports = router