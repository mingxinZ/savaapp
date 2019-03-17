var mongoose = require('mongoose')
var Schema = mongoose.Schema

var sharesSchema = new Schema({
  "username": String,
  "usershare": String,
  "image": String,
  "usericon": String
})

module.exports = mongoose.model('Share', sharesSchema)