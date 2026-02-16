const express = require('express');
const router = express.Router();
const {
    getCashMovements,
    createCashMovement,
    updateCashMovement,
    deleteCashMovement
} = require('../controllers/cashController');

router.get('/', getCashMovements);
router.post('/', createCashMovement);
router.put('/:id', updateCashMovement);
router.delete('/:id', deleteCashMovement);

module.exports = router;
