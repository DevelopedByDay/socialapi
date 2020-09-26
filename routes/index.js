const router = require('express').Router();
const { Router } = require('express');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;