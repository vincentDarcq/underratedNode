const ArtistePage = require('../models/artistePage.model');

exports.getAllArtistes = () => {
    return ArtistePage.find({}).exec();
}

exports.findOne = (nom) => {
    return ArtistePage.find({ nom : nom }).exec();
}

exports.addPhoto = (photo) => {
    return ArtistePage.updateOne({ nom: nom }, { photo: photo }).exec();
}

exports.pushVideo = (nom, video) => {
    return ArtistePage.updateOne({ nom: nom }, { $push: { videos: video } }).exec();
}

exports.pushPochette = (nom, pochette) => {
    return ArtistePage.updateOne({ nom: nom }, { $push: { pochettes: pochette } }).exec();
}

exports.deleteOne = (id) => {
    return ArtistePage.findByIdAndDelete(id).exec();
}

exports.addPhoto = (id, artiste) => {
    return ArtistePage.findByIdAndUpdate({ _id: id }, { photo : artiste.photo }, {new: true}).exec();
}

exports.findByIdAndUpdate = (id, artiste) => {
    return ArtistePage.findByIdAndUpdate({ _id: id }, artiste , {new: true}).exec();
}