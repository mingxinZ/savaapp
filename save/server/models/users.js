var mongoose = require('mongoose')
var Schema = mongoose.Schema

var usersSchema = new Schema({
  "username": String,
  "pwd": String,
  "usericon": String,
  "likeSongs": []
})

module.exports = mongoose.model("User", usersSchema)