// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />


describe('Central de atendimento', function () {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    
    it('Acessar a central de atendimento', function () {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('Preenche os campos obrigatórios e envia o formulário', function () {

        cy.get('input[id="firstName"]')
            .should('be.visible')
            .type('Teste')
        cy.get('input[id="lastName"]').type('Teste')

        cy.get('input[id="email"]').type('teste@teste.com.br')
        cy.get('input[id="phone"]').type('11999999999')
        cy.get('textarea[id="open-text-area"]').type('Teste de envio de mensagem')
            .should('have.value', 'Teste de envio de mensagem')
        cy.get('button[class="button"]').click()

        cy.get('.success').should('be.visible')

    })

    it('Preenche os campos obrigatórios com email incorreto e envia o formulário', function () {

        cy.get('input[id="firstName"]')
            .should('be.visible')
            .type('Teste')
        cy.get('input[id="lastName"]').type('Teste')

        cy.get('input[id="email"]').type('teste@teste.com,br')
        cy.get('input[id="phone"]').type('11999999999')
        cy.get('textarea[id="open-text-area"]').type('Teste de envio de mensagem')
            .should('have.value', 'Teste de envio de mensagem')
        cy.get('button[class="button"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Validar mensagem de preenchimento obrigatório', function () {

        cy.get('button[class="button"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Selecionar produto', function () {

        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Selecionar produto por value', function () {

        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Selecionar produto por indice', function () {

        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Check radio button', function () {

        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca todos os checkboxes, depois desmarca o ultimo', function () {

        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Selecionando arquivos', function () {

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.eq('example.json')
            })

    })

    it('Selecionando arquivos, cm DragAndDrop', function () {

        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.eq('example.json')
            })

    })

    it('Cerifica politica de privacidade em outra aba', function () {

        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
            
        cy.contains('Talking About Testing').should('be.visible')

    })

    it('Cerifica politica de privacidade, abre nova aba', function () {

        cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
    })
})