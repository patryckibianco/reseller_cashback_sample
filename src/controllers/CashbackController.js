const axios = require('axios');

module.exports = {
    async show(req, res) {
        const tokenKey = 'ZXPURQOARHiMc6Y0flhRC1JKElZQVFRnm';
        const cashback = await axios.get('https://host.amazonaws.com/v1/cashback?cpf=12312312323',  {headers: {token: tokenKey}});
        return res.json(cashback.data);
    }
};


