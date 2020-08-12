const express = require('express');
const SellerController = require('./controllers/SellerController');
const PurchaseController = require('./controllers/PurchaseController');
const LoginController = require('./controllers/LoginController');
const CashbackController = require('./controllers/CashbackController');

const routes = express.Router();


routes.get('/', (req, res) => {
    // Pegar param do Request ?name= Patrycki
    //return res.json({ message: `Hello ${req.query.name}`});
    
    return res.json({ message: 'Hello Sir' });
});

routes.post('/login', LoginController.login);
routes.post('/seller', SellerController.store);
routes.post('/purchase', PurchaseController.store);
routes.put('/purchase', PurchaseController.update);
routes.delete('/purchase/:purchaseId', PurchaseController.delete);
routes.get('/purchase/:purchaseId', PurchaseController.show);
routes.get('/purchase/list/:cpf', PurchaseController.index);
routes.get('/cashback', CashbackController.show);

module.exports = routes;