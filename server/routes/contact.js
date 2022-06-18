const router = require('express').Router();
const {
    sendMail
  } = require('../controllers/contact');


router.post('/sendMail', sendMail);

module.exports = router;