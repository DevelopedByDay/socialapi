const router = require('express').Router();
const { Router } = require('express');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.send('Incorrect Route Provided');
});

module.exports = router;