import { Router } from "express";

import { postInscricao } from "../controllers/inscricaoController.js";

const router = Router()

//localhost:3333/eventos/palestrantes
router.post('/inscrever', postInscricao)

export default router;