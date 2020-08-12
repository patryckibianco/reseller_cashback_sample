const Seller = require('../models/Seller');
const MessagesController = require('./MessagesController');

module.exports = {
    async login(req, res) {

        const { cpf, password } = req.body.seller;

        const sellerAuthenticated = await Seller.findOne({ cpf: cpf, password: password });

        if(sellerAuthenticated) {
            return res.json(sellerAuthenticated);
        } else {
            return res.status(403).json(MessagesController.getMessageAuthenticationFailed());
        }
    }

};