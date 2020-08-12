const { Schema, model } = require('mongoose');

const PurchaseSchema = new Schema(
    {
        code: {
            type: Number,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        sellerCpf: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        cashbackPercent: {
            type: Number,
            required: true
        },
        cashbackValue: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Purchase', PurchaseSchema);