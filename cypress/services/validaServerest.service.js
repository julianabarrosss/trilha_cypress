
export default class validaServerest {

    //Validações das ações que podemos realizar na API
    //Validar a buscar de usuários
    //Validar cadastrar de novos usuários
    //Validar o login
    
    // Usuários //

    static validarBuscaDeUsuarios(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body).exist
        expect(resposta.body.quantidade).exist
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body).to.have.property('usuarios')
        expect(resposta.body.usuarios).to.be.a('array')
        //let usuarios = resposta.body.usuarios
        //for (let each in usuarios)

        //expect(resposta.body.quantidade).to.be.greaterThan(3)

    }

    // Login //

    static validarLoginComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body).to.haveOwnProperty('authorization')
    }

    // Produtos //

    static validarBuscaDeProdutos(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.quantidade).to.be.a('number')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('nome')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('preco')
        expect(resposta.body.produtos[0]).to.haveOwnProperty('descricao')
    }
    static validarCadastroDeProdutoComSucesso(resposta){
        expect(resposta).to.be.a('object')
        expect(resposta.body.message).to.be.a('string')
        expect(resposta.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(resposta.body).to.haveOwnProperty('_id')
    }
    }