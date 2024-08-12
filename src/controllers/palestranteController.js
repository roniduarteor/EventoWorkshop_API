import conn from "../config/conn.js"
import { v4 as uuidv4 } from 'uuid'

export const getPalestrante = (request, response) =>{
    response.status(200).json({message: "FOI"})
}