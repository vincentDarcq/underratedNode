const ArtistePage = require('../models/artistePage.model');

exports.findOne = (nom) => {
    return ArtistePage.find({ nom : nom }).exec();
}

exports.pushVideo = (nom, video) => {
    return ArtistePage.updateOne({ nom: nom }, { $push: { videos: video } }).exec();
}

exports.pushAlbum = (nom, album) => {
    return ArtistePage.updateOne({ nom: nom }, { $push: { albums: album } }).exec();
}