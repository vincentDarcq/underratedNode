const { newService } = require('../models/service.model');
const {
    findByIdAndUpdate,
    getService,
    findAll
  } = require('../queries/service.queries');

exports.create = async (req, res) => {
  const service = newService(req);
  service.save((err) => {
    if (err) { res.status(500).json(err) }
    res.status(200).json(service);
  });
}

exports.get = async (req, res) => {
  const services = await findAll();
  res.status(200).json(services);
}

exports.uploadImages = async (req, res) => {
    util.inspect(req.files, { compact: false, depth: 5, breakLength: 80, color: true });
    let upload = {};
    const service = await getService(req.query.serviceId);
    if (req.files.image) {
      upload.image = req.files.image[0].filename;
      if (service.image) {
        fs.unlink(path.join(__dirname, `../upload/${service.image}`), err => {
          if (err) throw err;
        });
      }
    } else {
      upload.image1 = event.image1;
    }
    const updatedService = await findByIdAndUpdate(req.query.eventId, upload);
    res.status(200).json(updatedService);
}