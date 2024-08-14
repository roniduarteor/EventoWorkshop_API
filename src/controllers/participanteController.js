import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

// helpers
import createUserToken from "../helpers/create-user-token.js"
import getToken from "../helpers/get-token.js"

export const postParticipantes = (request, response) => {
    const { nome, email } = request.body

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
        nome,
        "email",
        email
    ]

    conn.query(checkSql, checkSqlData, async (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar existência de participantes"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "Participante já cadastrado!"})
            return console.log(err)
        }
        console.log(data) // ta vindo vazio, por queeee, eu vou endoidar

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
    let participanteAtual

    if (request.headers.authorization) {
        const token = getToken(request)

        const decoded = jwt.decode(token, "SENHASUPERSEGURA") // função para decodificar o token

        const participanteId = decoded.id

        const checkSql = /*sql*/ `select * from participante where ?? = ?`
        const checkData = ['participante_id', participanteId]
        conn.query(checkSql, checkData, (err, data) => {
            if (err) {
                console.error(err)
                response.status(500).json({ err: 'Erro ao verificar participante' })
                return
            }

            participanteAtual = data[0]
            response.status(200).json(participanteAtual)
        })
    } else {
        response.status(500).json({err: "Deu erro ao verificar o usuário"})
    }
}