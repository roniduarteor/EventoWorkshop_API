import { Router } from "express";

import { postFeedback } from "../controllers/feedbackController.js";

const router = Router()

//localhost:3333/eventos/criar
router.post('/feedback', postFeedback)


export default router;