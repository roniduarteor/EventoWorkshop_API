import conn from "../config/conn.js";

const tableEvento = /*sql*/ `
    CREATE TABLE IF NOT EXISTS evento(
        evento_id varchar(60) primary key,
        titulo varchar(255) not null,
        data_evento date not null,
        palestranteId varchar(255) not null,

        foreign key (palestranteId) references palestrantes(palestrante_id),

        created_at timestamp default current_timestamp,
        updated_aat timestamp default current_timestamp on update current_timestamp
    )
`

conn.query(tableEvento, (err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log('Tabela de [evento] criado com sucesso')
})