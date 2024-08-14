import { Router } from "express";

import { postParticipantes} from "../controllers/participanteController.js";

const router = Router()

//localhost:3333/eventos/criar
router.post('/registrar', postParticipantes)


export default router;