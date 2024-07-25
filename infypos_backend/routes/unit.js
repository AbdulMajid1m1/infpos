const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unit');

router.post('/', unitController.create);
router.get('/', unitController.getUnits);
router.get('/search', unitController.searchUnits);
router.put('/:id', unitController.update);
router.delete('/:id', unitController.delete);

module.exports = router;
