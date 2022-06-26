const router = require('express').Router();
const storage = require('../upload/multer');
const {
    findAll,
    modifier,
    addPhoto,
    addPochette,
    findArtiste,
    deleteArtiste
  } = require('../controllers/artistePage');

router.get('/findAll', findAll);
router.get('/findArtiste', findArtiste);
router.post('/modifierArtistePage', modifier);
router.post('/addPhoto', storage.single('photo'), addPhoto);
router.post('/uploadPhotoAlbum', storage.single('photoPochette'), addPochette);
router.get('/deleteArtiste', deleteArtiste);

module.exports = router;