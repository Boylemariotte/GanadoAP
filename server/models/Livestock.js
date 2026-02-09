const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    seller: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        rating: { type: Number, default: 0 }
    },
    images: [{ type: String }],
    videos: [{ type: String }],
    description: { type: String, required: true },
    purpose: {
        type: String,
        required: true,
        enum: ['leche', 'carne', 'doble_proposito']
    },
    healthStatus: {
        type: String,
        required: true,
        enum: ['excellent', 'good', 'fair']
    },
    vaccinations: [{ type: String }],
    available: { type: Boolean, default: true },
    listedDate: { type: Date, default: Date.now },

    // Technical Data
    births: { type: Number, default: 0 },
    milkYield: { type: Number },
    gestationTime: { type: Number, default: 0 },
    offspring: {
        sex: { type: String, enum: ['hembra', 'macho'] },
        quantity: { type: Number, default: 0 }
    },

    // Batch Sales
    isLot: { type: Boolean, default: false },
    lotSize: { type: Number, default: 1 }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Livestock', livestockSchema);
