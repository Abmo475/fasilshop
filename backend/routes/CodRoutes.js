const express = require('express');
const { AddCOD } = require('../controllers/CODController');

const router = express.Router();

router.route('/cod').post(AddCOD);

module.exports = router;