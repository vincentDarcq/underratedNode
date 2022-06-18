const router = require('express').Router();
const { signin, validToken } = require('../controllers/authentication');

router.get('/signin', signin);
router.get('/validToken', validToken);

module.exports = router;