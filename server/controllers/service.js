const { newService } = require('../models/service.model');
const {
    findByIdAndUpdate,
    getService,
    findAll,
    deleteById
  } = require('../queries/service.queries');
const util = require('util');
const fs = require('fs');

exports.create = async (req, res) => {
  const service = newService(req);
  service.save((err) => {
    if (err) { res.status(500).json(err) }
    res.status(200).json(service);
  });
}

exports.deleteById = async (req, res) => {
  const service = await deleteById(req.query.id);
  removeImage(service);
  res.status(200).json(service);
}

exports.get = async (req, res) => {
  const services = await findAll();
  res.status(200).json(services);
}

exports.uploadImages = async (req, res) => {
  util.inspect(req.file, { compact: false, depth: 5, breakLength: 80, color: true });
  let service = await getService(req.query.id);
  if (req.file.filename) {
    service.image = req.file.filename;
    service = await findByIdAndUpdate(req.query.id, service);
    res.status(200).json(service);
  }
}

removeImage = (service) => {
  if (service.image) {
    fs.unlink(path.join(__dirname, `../upload/${service.image}`), err => {
      if (err) throw err;
    });
  }
}