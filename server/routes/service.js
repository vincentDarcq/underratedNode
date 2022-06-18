const router = require('express').Router();
const storage = require('../upload/multer');
const {
    uploadImages,
    create,
    get,
    deleteById
  } = require('../controllers/service');


router.post('/createService', create);
router.get('/get', get);
router.post('/uploadImage', storage.single('image'), uploadImages)
router.get('/deleteService', deleteById);

module.exports = router;