const express = require('express');
const router = express.Router();
const productBrandController = require('../controllers/productBrand');

router.post('/', productBrandController.create);
router.get('/', productBrandController.getBrands);
router.get('/search', productBrandController.searchBrands);
router.put('/:id', productBrandController.update);
router.delete('/:id', productBrandController.delete);

module.exports = router;
