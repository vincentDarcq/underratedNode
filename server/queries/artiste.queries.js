const Artiste = require('../models/artiste.model');

exports.getAllArtistes = () => {
    return Artiste.find({}).exec();
}

exports.getArtiste = (id) => {
    return Artiste.findById({ _id : id }).exec();
}

exports.deleteOne = (artisteId) => {
    return Artiste.findByIdAndDelete(artisteId).exec();
  }

exports.findByIdAndUpdate = (id, artiste) => {
    return Artiste.findByIdAndUpdate({ _id: id }, { photo : artiste.photo })
}