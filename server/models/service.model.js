const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = Schema({
  titre: String,
  paragraphe: String,
  image: String
});

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;

module.exports.newService = function (req) {
  const newService = new Service({
      titre: req.body.titre,
      paragraphe: req.body.paragraphe,      
      image1: null,
  });
  return newService;
}