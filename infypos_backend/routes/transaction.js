const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction');

router.get('/search', transactionController.searchTransactions);
router.post('/', transactionController.createTransaction);
router.get('/:id', transactionController.getTransaction);
router.get('/', transactionController.getTransactions);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

module.exports = router;
