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
const util = require('util');

exports.findAll = async (req, res) => {
    const artistes = await getAllArtistes();
    res.status(200).json(artistes);
}

exports.modifier = async (req, res) => {
    const artistePage = await findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json(artistePage);
}

exports.addPhoto = async (req, res) => {
  util.inspect(req.file, { compact: false, depth: 5, breakLength: 80, color: true });
  let artiste = await findOne(req.query.id);
  if (req.file.filename) {
    artiste.photo = req.file.filename;
    artiste = await addPhoto(artiste._id, artiste);
    res.status(200).json(artiste);
  }
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

exports.deleteVideo = async (req, res) => {
    const updated = await pullVideo(req.query.artiste, req.query.video);
    if(updated.modifiedCount === 1){
        const artistePage = await findOne(req.query.artiste);
        res.status(200).json(artistePage);
    }else {
        res.status(200).json("fail to delete video to artistePage");
    }
}

exports.addPochette = async (req, res) => {
    util.inspect(req.file, { compact: false, depth: 5, breakLength: 80, color: true });
    let artiste = await findOne(req.query.id);
    if (req.file.filename) {
        const updated = await pushPochette(artiste.nom, req.file.filename);
        res.status(200).json(updated);
    }
}

exports.deletePochette = async (req, res) => {
    const updated = await pullPochette(req.query.artiste, req.query.pochette);
    if(updated.modifiedCount === 1){
        const artistePage = await findOne(req.query.artiste);
        res.status(200).json(artistePage);
    }else {
        res.status(200).json("fail to add album to artistePage");
    }
}


removeImage = (artistePage) => {
    if (artistePage.photo) {
      fs.unlink(path.join(__dirname, `../upload/${artiste.photo}`), err => {
        if (err) throw err;
      });
    }
}