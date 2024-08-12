import { Router } from "express";

import { getPalestrante, postPalestrantes} from "../controllers/palestranteController.js";

const router = Router()

//localhost:3333/eventos/palestrantes
router.get('/', getPalestrante)
router.post('/', postPalestrantes)

export default router;