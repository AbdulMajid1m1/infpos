const express = require('express');
const router = express.Router();
const baseUnitController = require('../controllers/baseunit');

router.post('/', baseUnitController.create);
router.get('/', baseUnitController.getBaseUnits);
router.get('/search', baseUnitController.searchBaseUnits);
router.put('/:id', baseUnitController.update);
router.delete('/:id', baseUnitController.delete);

module.exports = router;
