Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Teste')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('testedasilva@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
}) 