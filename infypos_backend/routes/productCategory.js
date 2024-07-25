const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/productCategory');

router.post('/', productCategoryController.create);
router.get('/', productCategoryController.getCategories);
router.get('/search', productCategoryController.searchCategories);
router.put('/:id', productCategoryController.update);
router.delete('/:id', productCategoryController.delete);

module.exports = router;
