const router = require('express').Router();
const service = require('./service');
const contact = require('./contact');
const auth = require('./auth');
const artiste = require('./artiste');
const youtube = require('./youtube');


router.use('/api/service', service);
router.use('/api/contact', contact);
router.use('/api/auth', auth);
router.use('/api/artiste', artiste);
router.use('/api/youtube', youtube);

module.exports = router;