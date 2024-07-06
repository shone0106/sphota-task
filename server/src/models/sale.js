const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    totalPrice: { type: Number, required: true },
    gstAmount: { type: Number, required: true },
    saleDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', salesSchema);
