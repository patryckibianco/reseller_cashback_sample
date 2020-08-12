const { Schema, model } = require('mongoose');

const SellerSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        specialSeller: {
            type: Boolean,
            required: true
        }
    }, 
    {
        timestamps: true //createdAt and updatedAt
    }
);

module.exports = model('Seller', SellerSchema);