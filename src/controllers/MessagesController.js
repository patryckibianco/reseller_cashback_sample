module.exports = {
    getMessageAuthenticationFailed() {
        const message = {
            code: 1,
            message: 'Authentication Failed!'
        }; 
        return message;
    },
    getMessageSellerAlreadyExists(seller) {
        const message = {
            code: 2,
            message: 'Seller already exists.',
            seller: seller
        };
        return message;
    },
    getMessageSellerNotFound(cpf) {
        const message = {
            code: 3,
            message: 'Seller not found.',
            cpf: cpf
        };
        return message;
    },
    getMessagePurchaseUpdated(purchase) {
        const message = {
            code: 4,
            message: 'Purchase updated.',
            purchase: purchase
        };
        return message;
    },
    getMessagePurchaseDeleted(purchase) {
        const message = {
            code: 5,
            message: 'Purchase deleted.',
            purchase: purchase
        };
        return message;
    },
    getMessagePurchaseAlreadyExists(purchase) {
        const message = {
            code: 6,
            message: 'Purchase already exists.',
            purchase: purchase
        };
        return message;
    },
    getMessagePurchaseNotFound(purchase) {
        const message = {
            code: 7,
            message: 'Purchase not found.',
            purchase: purchase
        };
        return message;
    },
    getMessageInvalidId(id) {
        const message = {
            code: 8,
            message: 'Purchase id is not valid.',
            id: id
        };
        return message;
    },
    getMessagePurchaseIdNotFound(purchaseId) {
        const message = {
            code: 9,
            message: 'Purchase id not found.',
            purchaseId: purchaseId
        };
        return message;
    },
    getMessagePurchaseNotDeleted(purchase) {
        const message = {
            code: 10,
            message: 'Purchase not deleted, please verify the status.',
            purchase: purchase
        };
        return message;
    },
    getMessageHasNoPurchases() {
        const message = {
            code: 11,
            message: 'Seller has no registered purchases.'
        };
        return message;
    }
};