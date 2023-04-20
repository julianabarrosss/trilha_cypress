/// <reference types="cypress" />

import Serverest from "../services/serverest.service"
import validaServerest from "../services/validaServerest.service"

describe('Casos de testes sobre a rota /login da API Serverest', () => {

    it('Deve realizar login com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then( usuario => {
            Serverest.logar(usuario).then( res => {
                validaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
        
    })

})