const Youtube = require('../models/youtube.model');

exports.getAllArtistes = () => {
    return Youtube.find({}).exec();
}

exports.findOne = (nom) => {
    return Youtube.find({ artiste : nom }).exec();
}

exports.deleteOne = (youtubeId) => {
    return Youtube.findByIdAndDelete({ _id: youtubeId}).exec();
}

exports.pullVideo = (nom, id) => {
    return Youtube.updateOne({ artiste: nom }, { $pull: { videos: { id: id } } }).exec();
}

exports.pushVideo = (nom, id, description) => {
    return Youtube.updateOne({ artiste: nom }, { $push: { videos: { id: id, description: description } } }).exec();
}