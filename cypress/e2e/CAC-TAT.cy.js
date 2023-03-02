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

    /**
     * Testa o envio do formulario, e avança no tempo para validar o comportamento da mensagem de sucesso
     * Usando cy.clock -> congela o tempo do navegado
     * cy.tick -> avança o tempo
     */

    it('Preenche os campos obrigatórios e envia o formulário', function () {
        cy.clock()
        cy.get('input[id="firstName"]')
            .type('Teste')
        cy.get('input[id="lastName"]')
            .type('Teste')

        cy.get('input[id="email"]')
            .type('teste@teste.com.br')
        cy.get('input[id="phone"]')
            .type('11999999999')
        cy.get('textarea[id="open-text-area"]')
            .type('Teste de envio de mensagem')
            .should('have.value', 'Teste de envio de mensagem')
        cy.get('button[class="button"]').click()

        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')

    })

    /**
     * Função invoke -> permite executar uma função javascript. Ex: invoke('hide') - esconde elemento | Ex: invoke('show') - exibe elemento
     */

    it('Exibe e esconde mensagens de sucesso', function () {

        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
    })

    it('Exibe e esconde mensagens de erro', function () {

        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')

    })

    /**
     * Cypress._.repeat -> repete uma string quantas vezes for necessário. Util para testar tamanho maximo de campos
     * Comando invoke é possível manipular elementos DOM. Ex: invoke('val', 'Teste') - preenche um campo com o valor 'Teste'
     */
    it('Preenche uma area de texto usando o comando invoke', function () {
        const longText = Cypress._.repeat('0123456789 | Test | ', 1000)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    /**
     * cy.request -> permite fazer requisições HTTP e validar o retorno
     * 
     */
    it('Faz uma requisição HTTP', function () {
        cy.request('https://qaacademy.com.br')
        .should(function(response){ // função anonima
            const {status, statusText, body} = response // desestruturação de objeto
            expect(status).to.equal(200) // expect -> valida se o valor é igual ao esperado
            expect(statusText).to.equal('OK') // expect -> valida se o valor é igual ao esperado
            expect(body).to.include('QA Academy')   // expect -> valida se o valor é igual ao esperado
        })
    })

    it('Exibe e esconde Gatinho', function () {

        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')

    })
    


})