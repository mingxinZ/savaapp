var mongoose = require('mongoose')
var Schema = mongoose.Schema

var lyricsSchema = new Schema({
  "content": String,
  "id": Number
})

module.exports = mongoose.model('Lyric', lyricsSchema)