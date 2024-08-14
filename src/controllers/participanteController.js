import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'

// helpers
import createUserToken from "../helpers/create-user-token.js"

export const postParticipantes = async (request, response) => {
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
            
            //depois de cadastrado preciso fazer uma nova consulta para buscar o usuário
            const participanteSql = /*sql*/ `select * from participante where ?? = ?`

            const participanteData = ["participante_id", participante_id]

            conn.query(participanteSql, participanteData, async (err, data) => {
                if (err) {
                    console.error(err)
                    response.status(500).json({ err: "Erro ao selecionar participante" })
                    return
                }
                const participante = data[0]

                try {
                    await createUserToken(participante, request, response) // lembrar de colocar o async no começo da função
                } catch (error) {
                    console.error(error)
                }
            })


            // response.status(201).json({message: 'Participante cadastrado!'})
        })
    })
}

export const getParticipantes = (request, response) => {
    
    
    const sql = /*sql*/ `
    select * from participante
    `

    conn.query(sql, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao verificar participantes existentes" })
            return console.log(err)
        }

        const participantes = data
        response.status(200).json(participantes)
    })
}