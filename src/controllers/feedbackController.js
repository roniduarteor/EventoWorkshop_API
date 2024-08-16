import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'

export const postFeedback = (request, response) =>{
    const { participanteId, eventoId, nota, comentario } = request.body

    if (!participanteId) {
        response.status(400).json({ message: 'O Id do participante é obrigatório!' })
        return
    }
    if (!eventoId) {
        response.status(400).json({ message: 'O Id do evento é obrigatório!' })
        return
    }
    if (!nota) {
        response.status(400).json({ message: 'A sua avaliação é necessária!' })
        return
    }


    const checkSql = /*sql*/ `
    select * from feedback
    where ?? = ? and
    ?? = ?
    `

    const checkSqlData = [
        "participanteId",
        participanteId,
        "eventoId",
        eventoId
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar existência de feedback"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "Feedback já realizado! Agradecemos sua opnião"})
            return console.log(err)
        }

        const feedback_id = uuidv4()

        const insertSql = /*sql*/ `
        insert into feedback(??, ??, ??, ??, ??)
        values(?, ?, ?, ?, ?)
        `

        const insertSqlData = [
            "feedback_id",
            "participanteId",
            "eventoId",
            "nota",
            "comentario",
   
            feedback_id,
            participanteId,
            eventoId,
            nota, 
            comentario
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao postar seu feedback"})
                return console.log(err)
            }

            response.status(201).json({message: 'Feedback postado! Agradecemos sua opnião'})
        })
    })
}

export const getMaisPopular = (request, response) => {
    const sql = /*sql*/ `
    select count(participanteId) as "Quantidade de Inscrições", eventoId  from inscricao group by eventoId
    `

    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar participantes existentes"})
            return console.log(err)
        }

        const participante = data
        response.status(200).json(participante)
    })
}