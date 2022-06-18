const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const youtubeSchema = Schema({
    artiste: String,
    videos: Array
  });
  
const Youtube = mongoose.model('youtube', youtubeSchema);

module.exports = Youtube;

module.exports.newYoutube = function (req) {
    const youtube = new Youtube({
        artiste: req.query.artiste,
        videosIds: []
    });
    return youtube;
  }