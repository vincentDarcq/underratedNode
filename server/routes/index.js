const router = require('express').Router();
const service = require('./service');

router.use('/api/service', service);

module.exports = router;