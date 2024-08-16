import { Router } from "express";

import { postEventos, getEventos, editarEventos, cancelarEvento } from "../controllers/eventoController.js";

const router = Router()

//localhost:3333/eventos/criar
router.post('/criar', postEventos)
router.get('/agenda', getEventos)
router.put('/editar/:evento_id', editarEventos)
router.delete('/cancelar/:evento_id', cancelarEvento)


export default router;