const util = require('util');
const fs = require('fs');
const path = require('path');
const { 
    pushVideo,
    pullVideo,
    pushPochette,
    pullPochette,
    findOne,
    deleteOne,
    addPhoto,
    getAllArtistes,
    findByIdAndUpdate
} = require('../queries/artistePage.queries');

exports.findAll = async (req, res) => {
    const artistes = await getAllArtistes();
    res.status(200).json(artistes);
}

exports.modifier = async (req, res) => {
    const oldArtistePage = await findOne(req.body.nom);
    const artistePage = await findByIdAndUpdate(req.body._id, req.body);
    for(let pochette of oldArtistePage[0].pochettes){
        if(artistePage.pochettes.indexOf(pochette) === -1){
            removeImage(pochette);
        }
    }
    res.status(200).json(artistePage);
}

exports.addPhoto = async (req, res) => {
  util.inspect(req.file, { compact: false, depth: 5, breakLength: 80, color: true });
  let artiste = await findOne(req.query.artiste);
  if(artiste[0].photo){
    removeImage(artiste[0].photo);
  }
  artiste.photo = req.file.filename;
  artiste = await addPhoto(artiste[0]._id, artiste);
  res.status(200).json(artiste);
}

exports.deleteArtiste = async (req, res) => {
    const artisteDeleted = await deleteOne(req.query.artisteId);
    removeImage(artisteDeleted)
    res.status(200).json(artisteDeleted);
}

exports.findArtiste = async (req, res) => {
    const artistePage = await findOne(req.query.artiste);
    res.status(200).json(artistePage);
}

exports.addVideo = async (req, res) => {
    const updated = await pushVideo(req.query.artiste, req.query.video);
    if(updated.modifiedCount === 1){
        const artistePage = await findOne(req.query.artiste);
        res.status(200).json(artistePage);
    }else {
        res.status(200).json("fail to add video to artistePage");
    }
}

exports.addPochette = async (req, res) => {
    util.inspect(req.file, { compact: false, depth: 5, breakLength: 80, color: true });
    let artiste = await findOne(req.query.artiste);
    if (req.file.filename) {
        const updated = await pushPochette(artiste[0].nom, req.file.filename);
        res.status(200).json(updated);
    }
}

removeImage = (image) => {
    if (image) {
      fs.unlink(path.join(__dirname, `../upload/${image}`), err => {
        if (err) throw err;
      });
    }
}