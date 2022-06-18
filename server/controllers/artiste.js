const { newArtiste } = require('../models/artiste.model');
const { 
  getArtiste,
  findByIdAndUpdate,
  getAllArtistes,
  deleteOne
} = require('../queries/artiste.queries');
const util = require('util');

exports.findAll = async (req, res) => {
  const artistes = await getAllArtistes();
  res.status(200).json(artistes);
}

exports.create = async (req, res) => {
  const artiste = newArtiste(req);
  artiste.save((err) => {
    if (err) { res.status(500).json(err) }
    res.status(200).json(artiste);
  });
}

exports.uploadPhoto = async (req, res) => {
  util.inspect(req.file, { compact: false, depth: 5, breakLength: 80, color: true });
  let artiste = await getArtiste(req.query.id);
  if (req.file.filename) {
    artiste.photo = req.file.filename;
    artiste = await findByIdAndUpdate(req.query.id, artiste);
    res.status(200).json(artiste);
  }
}

exports.deleteOne = async (req, res) => {
  const artisteDeleted = await deleteOne(req.query.id);
  removeImage(artisteDeleted)
  res.status(200).json(artisteDeleted);
}

removeImage = (artiste) => {
  if (artiste.photo) {
    fs.unlink(path.join(__dirname, `../upload/${artiste.photo}`), err => {
      if (err) throw err;
    });
  }
}