import conn from "../config/conn.js";

const tableEvento = /*sql*/ `
    CREATE TABLE IF NOT EXISTS evento(
        evento_id varchar(60) primary key,

        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`

conn.query(tableEvento, (err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log('Tabela de [evento] criado com sucesso')
})