import conn from "../config/conn.js";

const tablePalestrantes = /*sql*/ `
    CREATE TABLE IF NOT EXISTS palestrantes(
        palestrante_id varchar(60) primary key,
        nome varchar(255) not null,
        expertise varchar(255) not null,


        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`

conn.query(tablePalestrantes, (err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log('Tabela de [palestrantes] criado com sucesso')
})