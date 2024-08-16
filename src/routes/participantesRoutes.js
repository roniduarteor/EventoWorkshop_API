import { Router } from "express";

import { postParticipantes, getParticipanteById, getParticipantes} from "../controllers/participanteController.js";

const router = Router()

//localhost:3333/eventos/criar
router.post('/registrar', postParticipantes)
router.get('/verificar', getParticipanteById)
router.get('/verificar/todos', getParticipantes)


export default router;