const express = require('express');
const router = express.Router();
const passport = require('passport');
const recordController = require('../controllers/record.controller');

router.get('/', recordController.getRecords);
router.get('/:id', recordController.getRecord);
router.delete('/:id', recordController.removeRecord);
router.post('/', recordController.createRecord);

module.exports = router;
