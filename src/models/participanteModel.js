import conn from "../config/conn.js";

const tableParticipante = /*sql*/ `
    CREATE TABLE IF NOT EXISTS participante(
        participante_id varchar(60) primary key,
        nome varchar(255) not null,
        email varchar(255) not null,

        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`

conn.query(tableParticipante, (err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log('Tabela de [participante] criado com sucesso')
})