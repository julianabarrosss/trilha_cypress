// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import Ajv from 'ajv'
const ajv = new Ajv({allErrors: true, verbose: true, strict: false})

Cypress.Commands.add('contractValidation', (res, schema, status) =>{
    cy.fixture(`schemas/${schema}/${status}.json`).then( schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)

        if(!valid){
            console.log(validate)
        }
    })
})

Cypress.Commands.add('postarUsuarioSemSucesso', () => {
    return cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: true,
        body: {
            "nome": "Joanne Howell",
            "email": "Lauriane_Prohaska16@yahoo.com",
            "password": "FimWitp3KxOH1Lg",
            "administrador": true
        }
    })
})

Cypress.Commands.add('rest', (method = 'GET', url = '/', body = null, failOnStatusCode = false) => {
    return cy.request({
        method: method,
        url: url,
        failOnStatusCode: failOnStatusCode,
        body: body
    })
})

Cypress.Commands.add('logar', (email, senha) =>{
    return cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: {
            "email": email,
            "password": senha
        }
    })
})
Cypress.Commands.add('buscarUsuarioParaLogin', () => {
    cy.request('GET', '/usuarios').then( res => {
        expect(res.body).to.haveOwnProperty('usuarios')
        return {
            email: res.body.usuarios[0].email,
            senha: res.body.usuarios[0].password
        }
    })
})