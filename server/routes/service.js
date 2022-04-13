const storage = require('../upload/multer');
const router = require('express').Router();
const {
    uploadImages,
    create,
    get
  } = require('../controllers/service');


router.post('/createService', create);
router.get('/get', get);
router.post('/uploadImages', storage.fields([{ name: 'image' }]), uploadImages)

module.exports = router;