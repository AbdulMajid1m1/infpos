const express = require('express');
const router = express.Router();
const variationController = require('../controllers/productVariation');

router.post('/', variationController.create);
router.get('/', variationController.getVariations);
router.get('/search', variationController.searchVariations);
router.put('/:id', variationController.update);
router.delete('/:id', variationController.delete);

module.exports = router;
