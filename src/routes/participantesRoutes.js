import { Router } from "express";

import { postParticipantes, getParticipantes} from "../controllers/participanteController.js";

const router = Router()

//localhost:3333/eventos/criar
router.post('/registrar', postParticipantes)
router.get('/verificar', getParticipantes)


export default router;