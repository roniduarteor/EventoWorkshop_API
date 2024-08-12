import express from 'express'
import 'dotenv/config'
import path from 'node:path'


import conn from './config/conn.js'

const PORT = process.env.PORT

const app = express()
app.use(express.json())


// Usar as rotas que vão ser criadas aqui


//404
app.use((request, response) => {
    response.status(404).json({ message: 'Recurso não encontrado' })
})

app.listen(PORT, () => {
    console.log(`Servidor on PORT ${PORT}`)
})