const express = require('express');
const router = express.Router();

// @route Get api/profile
// @desc Test route
// @ express Public

router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
