const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artisteSchema = Schema({
    nom: String,
    photo: String
  });
  
const Artiste = mongoose.model('artiste', artisteSchema);

module.exports = Artiste;

module.exports.newArtiste = function (req) {
    const newArtiste = new Artiste({
        nom: req.body.nom,
        photo: null
    });
    return newArtiste;
  }