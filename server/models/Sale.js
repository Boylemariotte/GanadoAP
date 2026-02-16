const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    breed: String,
    weight: Number,
    images: [String],
    buyerName: {
        type: String,
        required: true
    },
    buyerPhone: {
        type: String,
        required: true
    },
    buyerEmail: String,
    buyerAddress: String,
    saleDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    salePrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['cash', 'transfer', 'check', 'card']
    },
    deliveryMethod: {
        type: String,
        required: true,
        enum: ['pickup', 'delivery']
    },
    deliveryDate: Date,
    deliveryAddress: String,
    observations: String,
    sellerName: String,
    sellerContact: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
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

module.exports = mongoose.model('Sale', saleSchema);
