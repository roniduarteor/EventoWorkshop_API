import conn from "../config/conn.js";

const tableFeedback = /*sql*/ `
    CREATE TABLE IF NOT EXISTS feedback(
        feedback_id varchar(60) primary key,
        participanteId varchar(255) not null,
        eventoId varchar(255) not null,
        nota decimal(2,1) not null,
        comentario varchar(500),

        foreign key (participanteId) references participante(participante_id),
        foreign key (eventoId) references evento(evento_id),

        created_at timestamp default current_timestamp,
        updated_aat timestamp default current_timestamp on update current_timestamp
    )
`

conn.query(tableFeedback, (err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log('Tabela de [feedback] criada com sucesso')
})