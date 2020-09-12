const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

router.get('/', testController.getTests);
router.post('/', testController.postTest);
router.get('/:id', testController.getTest);
router.put('/:id', testController.updateTest);
router.delete('/:id', testController.deleteTest);

module.exports = router;