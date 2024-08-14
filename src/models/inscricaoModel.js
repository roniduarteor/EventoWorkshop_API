import conn from "../config/conn.js";

const tableEvento = /*sql*/ `
    CREATE TABLE IF NOT EXISTS inscricao(
        inscricao_id varchar(60) primary key,
        participanteId varchar(255) not null,
        eventoId varchar(255) not null,

        foreign key (participanteId) references participante(participante_id),
        foreign key (eventoId) references evento(evento_id),

        created_at timestamp default current_timestamp,
        updated_aat timestamp default current_timestamp on update current_timestamp
    )
`

conn.query(tableEvento, (err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log('Tabela de [inscricao] criada com sucesso')
})