import { Router } from "express";

import { getMaisPopular, postFeedback } from "../controllers/feedbackController.js";

const router = Router()

//localhost:3333/eventos/criar
router.post('/feedback', postFeedback)
router.get('/mais-popular', getMaisPopular)


export default router;