const { Router } = require("express");
const router = Router();

const productController = require("../controllers/product");

router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);
router.get('/', productController.getProducts);
router.get('/search', productController.searchProducts);

module.exports = router;
