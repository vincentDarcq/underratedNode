const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistePageSchema = Schema({
    nom: String,
    photo: String,
    facebook: String,
    twitter: String,
    instagram: String,
    youtube: String,
    description: String,
    albums: Array,
    videos: Array
  });
  
const ArtistePage = mongoose.model('artistePage', artistePageSchema);

module.exports = ArtistePage;

module.exports.newArtistePage = function (req) {
    const newArtiste = new ArtistePage({
        nom: req.body.nom,
        photo: null,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        youtube: req.body.youtube,
        description: req.body.description,
        albums: [],
        videos: req.body.videos
    });
    return newArtiste;
  }