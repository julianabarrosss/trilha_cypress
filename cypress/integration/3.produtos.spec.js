/// <reference types="cypress" />

import Serverest from "../services/serverest.service"
import validaServerest from "../services/validaServerest.service"

describe('Casos de testes sobre a rota /produtos da API Serverest', () => {

    it('Deve buscar todos os produtos cadastrados', () => {
        Serverest.buscarProdutos().then( res => {
            validaServerest.validarBuscaDeProdutos(res)
        })
    })

    context('Logar com sucesso', () => {
        beforeEach('Logar', () => {
            Serverest.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then( usuario => {
            Serverest.logar(usuario).then( res => {
                validaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
        })
    
        it('Deve postar um novo produto com sucesso', () => {
            Serverest.cadastrarProdutoComSucesso().then( res => {
                validaServerest.validarCadastroDeProdutoComSucesso(res)
            })
        })
    })

})