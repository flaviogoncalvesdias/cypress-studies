/**
 * Cypress._.times(10, function () - > Serve para repetir o teste 10 vezes
 */

Cypress._.times(10, function () {
it(' Verifica politica de privacidade em "outra aba"', function () {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
})
})