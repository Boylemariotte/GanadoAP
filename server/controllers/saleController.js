const Sale = require('../models/Sale');
const Livestock = require('../models/Livestock');

exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.find().sort({ saleDate: -1 });
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSale = async (req, res) => {
    const sale = new Sale(req.body);
    try {
        const newSale = await sale.save();

        // Update livestock availability
        // req.body.productId is the _id of the animal
        await Livestock.findByIdAndUpdate(
            req.body.productId,
            { available: false }
        );

        res.status(201).json(newSale);
    } catch (error) {
        console.error('Error en createSale:', error);
        res.status(400).json({ message: error.message });
    }
};
