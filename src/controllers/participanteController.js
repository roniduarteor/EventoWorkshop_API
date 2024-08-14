import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'


export const postParticipantes = (request, response) => {
    const { nome, email} = request.body

    if (!nome) {
        response.status(400).json({ message: 'O nome do participante é obrigatório!' })
        return
    }
    if (!email) {
        response.status(400).json({ message: 'O email do participante é obrigatório!' })
        return
    }


    const checkSql = /*sql*/ `
    select * from participante
    where ?? = ? and
    ?? = ?
    `

    const checkSqlData = [
        "nome",
        email,
        "nome",
        email
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar existência de participantes"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "Participante já cadastrado!"})
            return console.log(err)
        }

        const participante_id = uuidv4()

        const insertSql = /*sql*/ `
        insert into participante(??, ??, ??)
        values(?, ?, ?)
        `

        const insertSqlData = [
            "participante_id",
            "nome",
            "email",
   
            participante_id,
            nome,
            email,
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao cadastrar participante"})
                return console.log(err)
            }

            response.status(201).json({message: 'Participante cadastrado!'})
        })
    })
}