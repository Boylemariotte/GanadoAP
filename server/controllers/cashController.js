const CashMovement = require('../models/CashMovement');

// @desc    Get all cash movements
// @route   GET /api/cash
// @access  Private (Owner only)
const getCashMovements = async (req, res) => {
    try {
        const movements = await CashMovement.find().sort({ createdAt: -1 });
        res.json(movements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new cash movement
// @route   POST /api/cash
// @access  Private (Owner only)
const createCashMovement = async (req, res) => {
    try {
        const { category, concept, amount, totalBills, totalCoins } = req.body;

        const movement = new CashMovement({
            category,
            concept,
            amount,
            totalBills,
            totalCoins
        });

        const savedMovement = await movement.save();
        res.status(201).json(savedMovement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a cash movement
// @route   PUT /api/cash/:id
// @access  Private (Owner only)
const updateCashMovement = async (req, res) => {
    try {
        const movement = await CashMovement.findById(req.params.id);
        if (!movement) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }

        const updatedMovement = await CashMovement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedMovement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a cash movement
// @route   DELETE /api/cash/:id
// @access  Private (Owner only)
const deleteCashMovement = async (req, res) => {
    try {
        const movement = await CashMovement.findById(req.params.id);
        if (!movement) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }

        await CashMovement.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movimiento eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCashMovements,
    createCashMovement,
    updateCashMovement,
    deleteCashMovement
};
