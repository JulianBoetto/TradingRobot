import { Router } from "express";
const router = Router();
import { verifyToken } from "../lib/password.js";
import SymbolsController from "../controllers/symbolsController.js";
const symbolsController = new SymbolsController();

router.post('/allSymbols', 
verifyToken, 
symbolsController.allSymbols);
router.post('/createSymbol', verifyToken, symbolsController.createSymbols);
router.delete('/removeSymbol/:symbol/:pair', verifyToken, symbolsController.removeSymbols);

export default router;