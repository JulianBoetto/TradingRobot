const api = require('../api');

class SymbolsController {
    async allOrders(req, res) {
        try {
            
            res.status(200).send(orders);
        } catch (error) {
            res.status(401).send(error);
        }
    }
}

module.exports = SymbolsController;