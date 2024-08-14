import jwt from 'jsonwebtoken'

// assincrono
const createUserToken = async (participante, request, response) => { // preciso passar o usuario do banco de dados, fazer a requisição pra ver se corresponde com o token
    // Criar o token

    const token = jwt.sign( // .sign responsável por criar o token, dentro dela preciso passar um objeto, e também criptografar o token
        {
            nome: participante.nome,
            id: participante.participante_id
        },
        'SENHASUPERSEGURAEDIFICIL' // coloca a senha para a criptografia
    ) 

    // Responder / Retornar o token
    response.status(200).json({
        message: "Você está logado!",
        token: token,
        participanteId: participante.participante_id
    })
}

export default createUserToken