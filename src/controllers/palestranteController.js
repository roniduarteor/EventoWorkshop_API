import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'

export const getPalestrante = (request, response) => {
    const sql = /*sql*/ `
    select * from palestrantes
    `

    conn.query(sql, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao verificar palestrantes existentes" })
            return console.log(err)
        }

        const palestrantes = data
        response.status(200).json(palestrantes)
    })
}

export const postPalestrantes = (request, response) => {
    const { nome, expertise } = request.body

    if (!nome) {
        response.status(400).json({ message: 'O nome do palestrante é obrigatório!' })
        return
    }
    if (!expertise) {
        response.status(400).json({ message: 'A área de atuação do palestrante é obrigatória!' })
        return
    }


    const checkSql = /*sql*/ `
    select * from palestrantes
    where ?? = ? and
    ?? = ?
    `

    const checkSqlData = [
        "nome",
        nome,
        "expertise",
        expertise
    ]

    conn.query(checkSql, checkSqlData, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar existência de palestrante"})
            return console.error(err)
        }

        if(data.length > 0){
            response.status(409).json({message: "Palestrante já cadastrado!"})
            return console.log(err)
        }

        const palestrante_id = uuidv4()

        const insertSql = /*sql*/ `
        insert into palestrantes(??, ??, ??)
        values(?, ?, ?)
        `

        const insertSqlData = [
            "palestrante_id",
            "nome",
            "expertise",
   
            palestrante_id,
            nome,
            expertise
        ]

        conn.query(insertSql, insertSqlData, (err)=>{
            if(err){
                response.status(500).json({message: "Erro ao cadastrar palestrante"})
                return console.log(err)
            }

            response.status(201).json({message: 'Palestrante cadastrado!'})
        })
    })

}