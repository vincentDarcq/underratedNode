const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = Schema({
  titre: String,
  paragraphe: String,
  image: String
});

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;