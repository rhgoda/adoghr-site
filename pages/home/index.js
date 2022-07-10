const path = require('path');
const express = require('express');

let router = express.Router();

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'index.html'));
});


module.exports = router;