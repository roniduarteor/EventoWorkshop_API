import { Router } from "express";

import { postEventos, getEventos } from "../controllers/eventoController.js";

const router = Router()

//localhost:3333/eventos/criar
router.post('/criar', postEventos)
router.get('/agenda', getEventos)


export default router;