/// <reference types="Cypress" />

beforeEach(() => {
    cy.visit('./src/index.html')
})

describe ('Central de Atendimento ao Cliente TAT', function () {
    it ('verifica o título da aplicação', function () {        
        cy.title()
          .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it ('preenche os campos obrigatórios e envia o formulário', function () {
        const textoLongo = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus, risus a varius auctor, diam metus pellentesque nisl, id sagittis diam felis at ligula. Nam vulputate ultricies justo, vitae semper nisl tempor sed. Ut nec mi congue, blandit ante sit amet, bibendum lacus. Nullam metus lectus, volutpat id pellentesque quis, iaculis eget nunc. Curabitur quis mi et nunc finibus auctor et ac nulla.'
        
        cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('testedasilva@gmail.com')
        cy.get('#open-text-area').type(textoLongo, { delay: 0 })
        
        cy.get('button[type="submit"]').click()

        cy.get('span[class="success"]').should('be.visible')
    })

    it ('exibe mensagem de erro ao submeter o formulário com um email inválido', function () {
        cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('testedasilva')
        cy.get('#open-text-area').type('Teste')

        cy.get('button[type="submit"]').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it ('campo telefone continua vazio quando preenchido com valor não numérico', function () {
        cy.get('#phone').type('Teste')
        cy.get('#phone').should('have.value', '')
    })
    
    it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes de enviar formulário', function() {
        cy.get('#firstName').type('Teste')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('testedasilva@gmail.com')
        cy.get('#open-text-area').type('Teste')
        
        cy.get('#phone-checkbox').check().should('be.checked')

        cy.contains('button', 'Enviar').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it ('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Teste').should('have.value', 'Teste')
            .clear().should('have.value', '')

        cy.get('#lastName')
            .type('Silva').should('have.value', 'Silva')
            .clear().should('have.value', '')

        cy.get('#email').type('testedasilva@gmail.com')
            .should('have.value', 'testedasilva@gmail.com')
            .clear().should('have.value', '')

        cy.get('#phone')
            .type('23183102803').should('have.value', '23183102803')
            .clear().should('have.value', '')
    })

    it ('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it ('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('span[class="success"]').should('be.visible')
    })

    it ('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it ('seleciona um produto (Mentoria) por seu valor', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it ('seleciona um produto (Blog) pelo seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it ('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    })

    it ('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check().should('be.checked')
            })
    })

    it ('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it ('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it ('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it ('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json', null).as('file')
        cy.get('#file-upload')
            .selectFile('@file')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it ('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target') 
            .click()
    })

    it ('testa a página da política de privacidade de forma independente', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})