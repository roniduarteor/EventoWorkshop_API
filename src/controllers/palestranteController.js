import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'

export const getPalestrante = (request, response) =>{
    const sql = /*sql*/ `
    select * from palestrantes
    `

    conn.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao verificar palestrantes existentes"})
            return console.log(err)
        }

        const palestrantes = data
        response.status(200).json(palestrantes)
    })
}