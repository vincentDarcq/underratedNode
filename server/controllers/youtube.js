const { newYoutube } = require('../models/youtube.model');
const { 
    getAllArtistes,
    deleteOne,
    pullVideo,
    pushVideo,
    findOne
  } = require('../queries/youtube.queries');

exports.create = async (req, res) => {
  const youtube = await findOne(req.query.artiste);
  if(youtube.length == 0){
    const newYT = newYoutube(req);
    newYT.save((err) => {
      if (err) { res.status(500).json(err) }
      res.status(200).json(newYT);
    });
  }else {
    res.status(200).json("cet artiste exite déjà");
  }
}

exports.getAll = async (req, res) => {
    const youtubes = await getAllArtistes();
    res.status(200).json(youtubes);
}

exports.deleteOne = async (req, res) => {
  const youtubeDeleted = await deleteOne(req.query.id);
  res.status(200).json(youtubeDeleted);
}

exports.pushVideo = async (req, res) => {
  const updated = await pushVideo(req.query.artiste, req.body.id, req.body.description);
  if(updated.modifiedCount === 1){
    const youtube = await findOne(req.query.artiste);
    res.status(200).json(youtube);
  }else {
    res.status(200).json("fail to add video id");
  }
}

exports.pullVideo = async (req, res) => {
  const updated = await pullVideo(req.query.artiste, req.body.id, req.body.decription);
  if(updated.modifiedCount === 1){
    const youtube = await findOne(req.query.artiste);
    res.status(200).json(youtube);
  }else {
    res.status(200).json("fail to delete video id");
  }
}