import { Router } from "express";

import { getPalestrante } from "../controllers/palestranteController.js";

const router = Router()

//localhost:3333/eventos/palestrantes
router.get('/palestrantes', getPalestrante)

export default router;