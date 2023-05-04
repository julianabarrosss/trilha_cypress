/// <reference types="cypress" />

import Serverest from "../services/serverest.service"
import validaServerest from "../services/validaServerest.service"
import Factory from "../fixtures/factory"

describe('Casos de testes sobre a rota /usuarios da API Serverest', () => {

    it('Deve buscar todos usuários cadastrados na Serverest', () => {
        Serverest.buscarUsuarios().then( res => {
            cy.log('Será validado o contrato')
            cy.contractValidation(res, 'get-usuarios', 200)
            validaServerest.validarBuscaDeUsuarios(res)
        })

    })

    it.only('Não deve postar um novo usuário administrador existente', () => {
        cy.postarUsuarioSemSucesso().then( res => {
            cy.contractValidation(res, 'post-usuarios', 400)
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
        })
    })

    it('Deve realizar login com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then
    })

    it('Deve buscar e salvar um usuário em um arquivo json', () => {
        let inteiro = Factory.gerarInteiroAleatorio()
         Serverest.buscarUsuarios().then( res => {
            cy.writeFile('./cypress/fixtures/usuario.json', res.body.usuarios[inteiro])
            validaServerest.validarBuscaDeUsuarios(res)
        })
    })

    it('Deve buscar o usuário de um arquivo json', () => {
        cy.fixture('usuario.json').then( json => {
            let usuario = {
                email: json.email,
                password: json.password
            }
            Serverest.logar(usuario).then( res => {
                validaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })

            cy.log("Nome >> " + JSON.stringify(json.nome))
            cy.log("ID >> " + JSON.stringify(json._id))
        })
    })


})