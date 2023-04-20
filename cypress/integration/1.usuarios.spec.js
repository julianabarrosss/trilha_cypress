/// <reference types="cypress" />

import Serverest from "../services/serverest.service"
import validaServerest from "../services/validaServerest.service"

describe('Casos de testes sobre a rota /usuarios da API Serverest', () => {

    it('Deve buscar todos usuários cadastrados na Serverest', () => {
        Serverest.buscarUsuarios().then( res => {
            validaServerest.validarBuscaDeUsuarios(res)
        })
     
    })

    it('Não deve buscar um novo usuário administrador existente', () => {
        cy.postarUsuarioSemSucesso().then( res => {
            cy.log(JSON.stringify(res))
            expect(res).to.be.a('object')
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
        })
    })
})