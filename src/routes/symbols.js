const express = require("express");
const router = express.Router();
const api = require('../api');
const { verifyToken } = require("../lib/password");
const SymbolsController = require("../controllers/symbolsController");
const symbolsController = new SymbolsController();

router.post('/allSymbols', 
verifyToken, 
symbolsController.allSymbols);
router.post('/createSymbol', verifyToken, symbolsController.createSymbols);
router.delete('/removeSymbol', verifyToken, symbolsController.removeSymbols);

module.exports = router;