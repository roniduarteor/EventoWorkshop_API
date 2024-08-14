import express from 'express'
import 'dotenv/config'

import conn from './config/conn.js'

import './models/palestrantesModel.js'
import './models/eventoModel.js'
import './models/participanteModel.js'

import palestranteRouter from './routes/palestrantesRoutes.js'
import eventosRoutes from './routes/eventosRoutes.js'
import participantesRoutes from './routes/participantesRoutes.js'

const PORT = process.env.PORT

const app = express()
app.use(express.json())


// Usar as rotas que vão ser criadas aqui
app.use('/eventos/palestrantes', palestranteRouter)
app.use('/eventos', eventosRoutes)
app.use('/eventos/participantes', participantesRoutes)

//404
app.use((request, response) => {
    response.status(404).json({ message: 'Recurso não encontrado' })
})

app.listen(PORT, () => {
    console.log(`Servidor on PORT ${PORT}`)
})