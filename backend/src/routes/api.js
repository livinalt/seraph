const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Folder for evidence

const scamCtrl = require('../controllers/scamController');
const reportCtrl = require('../controllers/reportController');

const router = express.Router();

router.get('/scams', scamCtrl.getScams);
router.get('/scams/:id', scamCtrl.getScam);
router.post('/scan', scamCtrl.scanUrl);
router.post('/report', upload.single('evidence'), reportCtrl.reportScam);

module.exports = router;