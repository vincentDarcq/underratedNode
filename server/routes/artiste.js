const router = require('express').Router();
const storage = require('../upload/multer');
const {
    create,
    uploadPhoto,
    findAll,
    deleteOne
  } = require('../controllers/artiste');


router.get('/findAll', findAll);
router.post('/createArtiste', create);
router.post('/uploadPhotoArtiste', storage.single('photo'), uploadPhoto);
router.get('/deleteOne', deleteOne);

module.exports = router;