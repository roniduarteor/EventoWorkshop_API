import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'

export const postInscricao = (request, response) => {
    const { participanteId, eventoId } = request.body

    if (!participanteId) {
        response.status(400).json({ message: 'O Id do participante é obrigatório!' })
        return
    }
    if (!eventoId) {
        response.status(400).json({ message: 'O Id do evento é obrigatório!' })
        return
    }


    const checkSql = /*sql*/ `
    select * from inscricao
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
            response.status(500).json({message: "Erro ao verificar existência de inscrição"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "Inscrição já realizada!"})
            return console.log(err)
        }

        const inscricao_id = uuidv4()

        const insertSql = /*sql*/ `
        insert into inscricao(??, ??, ??)
        values(?, ?, ?)
        `

        const insertSqlData = [
            "inscricao_id",
            "participanteId",
            "eventoId",
   
            inscricao_id,
            participanteId,
            eventoId,
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao realizar inscrição"})
                return console.log(err)
            }

            response.status(201).json({message: 'Inscrição realizada!'})
        })
    })
}