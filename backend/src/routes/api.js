const express = require('express');
const {
  getScams,
  getScamById,
  scanUrl,
  reportScam
} = require('../controllers/scamController');

const router = express.Router();

router.get('/scams', getScams);
router.get('/scams/:id', getScamById);
router.post('/scan', scanUrl);
router.post('/report', reportScam);

module.exports = router;