const { newArtistePage } = require('../models/artistePage.model');
const { 
    pushVideo,
    pushAlbum,
    findOne
} = require('../queries/artistePage.queries');

exports.create = async (req, res) => {
    const artistePage = newArtistePage(req);
    artistePage.save((err) => {
        if (err) { res.status(500).json(err) }
        res.status(200).json(artiste);
    });
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

exports.addAlbum = async (req, res) => {
    const updated = await pushAlbum(req.query.artiste, req.query.video);
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