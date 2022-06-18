const router = require('express').Router();
const {
    create,
    getAll,
    deleteOne,
    pushVideo,
    pullVideo
  } = require('../controllers/youtube');

router.get('/findAll', getAll);
router.get('/createYoutube', create);
router.get('/deleteOne', deleteOne);
router.post('/pushVideo', pushVideo);
router.get('/pullVideo', pullVideo);


module.exports = router;