const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse');

router.post('/', warehouseController.create);
router.get('/', warehouseController.getWarehouses);
router.get('/search', warehouseController.searchWarehouses);
router.put('/:id', warehouseController.update);
router.delete('/:id', warehouseController.delete);

module.exports = router;
