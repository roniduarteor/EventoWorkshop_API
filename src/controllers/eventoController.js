import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'

export const postEventos = (request, response) =>{
    const { titulo, data_evento, palestranteId } = request.body

    if (!titulo) {
        response.status(400).json({ message: 'O titulo do evento é obrigatório!' })
        return
    }
    if (!data_evento) {
        response.status(400).json({ message: 'A data do evento é obrigatória!' })
        return
    }
    if (!palestranteId) {
        response.status(400).json({ message: 'O Id dos palestrantes é obrigatório!' })
        return
    }


    const checkSql = /*sql*/ `
    select * from evento
    where ?? = ? and
    ?? = ?
    `

    const checkSqlData = [
        "titulo",
        data_evento,
        "titulo",
        data_evento
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar existência de evento"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "Evento já marcado!"})
            return console.log(err)
        }

        const evento_id = uuidv4()

        const insertSql = /*sql*/ `
        insert into evento(??, ??, ??, ??)
        values(?, ?, ?, ?)
        `

        const insertSqlData = [
            "evento_id",
            "titulo",
            "data_evento",
            "palestranteId",
   
            evento_id,
            titulo,
            data_evento,
            palestranteId
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao marcar evento"})
                return console.log(err)
            }

            response.status(201).json({message: 'Evento marcado!'})
        })
    })

}

export const getEventos = (request, response) => {
    const sql = /*sql*/ `
    select * from evento
    inner join palestrantes on evento.palestranteId = palestrantes.palestrante_id
    `

    conn.query(sql, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao verificar evento existentes" })
            return console.log(err)
        }

        const eventos = data
        console.log(data)
        response.status(200).json(eventos)
    })
}