/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/privacy.html')
})

describe('Central de Atendimento ao Cliente TAT - Política de privacidade', function () {
    it ('verifica o título da aplicação', function () {        
        cy.title()
          .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

    it.only ('verifica autoria', function () {            
        cy.get('#white-background p').last().should('have.text', 'Talking About Testing')
    })
}) 