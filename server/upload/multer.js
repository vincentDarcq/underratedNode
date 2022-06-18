const path = require('path');
const multer = require('multer');
const storage = multer(
  {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      }
    }),
    limits: { fieldSize: 10 * 1024 * 1024 } 
  });

module.exports = storage;