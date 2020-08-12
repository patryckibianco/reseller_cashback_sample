const axios = require('axios');
const Seller = require('../models/Seller');
const MessagesController = require('./MessagesController');

module.exports = {
    async store(req, res) {

        const { name, cpf, email, password, specialSeller } = req.body.seller;

        const sellerExists = await Seller.findOne({ cpf: cpf});

        if(sellerExists) {
            return res.json(MessagesController.getMessageSellerAlreadyExists(sellerExists));
        }

        const seller = await Seller.create({
            name,
            cpf,
            email,
            password,
            specialSeller
        });

        return res.json(seller);
    }
};