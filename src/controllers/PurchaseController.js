const mongoose = require('mongoose');
const Purchase = require('../models/Purchase');
const Seller = require('../models/Seller');
const MessagesController = require('./MessagesController');

module.exports = {
    async store(req, res) {

        const tenPercentCashback = 1000;
        const fifteenPercentCashBack = 1500;

        let purchase = req.body.purchase;

        let purchaseExists = await Purchase.findOne({ code: purchase.code, value: purchase.value, sellerCpf: purchase.sellerCpf });

        if(purchaseExists) {
            return res.json(MessagesController.getMessagePurchaseAlreadyExists(purchaseExists));
        } else {

            const sellerExists = await Seller.findOne({ cpf: purchase.sellerCpf});
            
            if(sellerExists) {

                const { code, value, sellerCpf } = purchase;

                const cashbackPercent = value <= tenPercentCashback ? 10 : (value <= fifteenPercentCashBack ? 15 : 20);
                const cashbackValue = value <= tenPercentCashback ? (value/100)*10 : (value <= fifteenPercentCashBack ? (value/100)*15 : (value/100)*20);

                purchase = await Purchase.create({
                    code,
                    value,
                    date: new Date(),
                    sellerCpf,
                    status: (sellerExists.specialSeller ? 'Aprovado' : 'Em validação'),
                    cashbackPercent: cashbackPercent,
                    cashbackValue: cashbackValue
                });
            } else {
                return res.status(400).json(MessagesController.getMessageSellerNotFound(purchase.sellerCpf));
            }

            return res.json(purchase);
        }
    },
    async update(req, res) {

        const tenPercentCashback = 1000;
        const fifteenPercentCashBack = 1500;

        const purchase = req.body.purchase;

        let purchaseExists = await Purchase.findById(purchase._id);

        if(purchaseExists) {

            purchaseExists.value = purchase.value;
            purchaseExists.status = purchase.status;

            const cashbackPercent = purchaseExists.value <= tenPercentCashback ? 10 : (purchaseExists.value <= fifteenPercentCashBack ? 15 : 20);
            const cashbackValue = purchaseExists.value <= tenPercentCashback ? (purchaseExists.value/100)*10 : (purchaseExists.value <= fifteenPercentCashBack ? (purchaseExists.value/100)*15 : (purchaseExists.value/100)*20);

            purchaseExists.cashbackPercent = cashbackPercent;
            purchaseExists.cashbackValue = cashbackValue;

            await purchaseExists.save();
            
        } else {
            return res.status(400).json(MessagesController.getMessagePurchaseNotFound(purchase));
        }
        
        return res.json(MessagesController.getMessagePurchaseUpdated(purchaseExists));
    },
    async delete(req, res) {

        const ObjectId = mongoose.Types.ObjectId;
        const { purchaseId } = req.params;

        if(ObjectId.isValid(purchaseId)) {
            const purchaseExists = await Purchase.findById(purchaseId);

            if(purchaseExists) {

                if(purchaseExists.status == 'Em validação') {
                    await purchaseExists.delete();
                    return res.json(MessagesController.getMessagePurchaseDeleted(purchaseExists));
                } else {
                    return res.json(MessagesController.getMessagePurchaseNotDeleted(purchaseExists));
                }

            } else {
                return res.status(400).json(MessagesController.getMessagePurchaseIdNotFound(purchaseId));
            }
        } else {
            return res.status(400).json(MessagesController.getMessageInvalidId(purchaseId));
        }
    },
    async index(req, res) {

        const { cpf } = req.params;

        const purchases = await Purchase.find({ sellerCpf: cpf });
        
        //Outra forma de fazer
        /*
        const purchases = await Purchase.find({
            $and: [
                { sellerCpf: {$eq: cpf}}
            ]
        });
        */

        if(purchases) {
            return res.json(purchases);
        } else {
            return res.status(404).json(MessagesController.getMessageHasNoPurchases());
        }
    },
    async show(req, res) {

        const ObjectId = mongoose.Types.ObjectId;
        const { purchaseId } = req.params;

        if(ObjectId.isValid(purchaseId)) {
            const purchaseExists = await Purchase.findById(purchaseId);

            if(purchaseExists) {
                return res.json(purchaseExists);
            } else {
                return res.status(400).json(MessagesController.getMessagePurchaseIdNotFound(purchaseId));
            }
        } else {
            return res.status(400).json(MessagesController.getMessageInvalidId(purchaseId));
        }
    }
};