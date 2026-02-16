const mongoose = require('mongoose');

const cashMovementSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ['inicio', 'gasto']
    },
    concept: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    totalBills: {
        type: Number,
        required: true,
        default: 0
    },
    totalCoins: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CashMovement', cashMovementSchema);
