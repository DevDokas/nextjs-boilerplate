/// <reference types="cypress"/>

describe('Work with basic elements', () => {
  beforeEach('Refresh the page to clean all inputs', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.reload();
  });

  it('Text', () => {
    cy.get('.facilAchar').should(
      'have.text',
      'Cuidado onde clica, muitas armadilhas...'
    );
  });

  it('Should click in a link and render a text', () => {
    cy.get('[href="#"]').click();

    cy.get('#resultado').should('have.text', 'Voltou!');
  });

  it('Text fields', () => {
    cy.get('#formNome').type('Cypress Test');
    cy.get('#formNome').should('have.value', 'Cypress Test');

    cy.get('#elementosForm\\:sugestoes')
      .type('Porraaaaaa')
      .should('have.value', 'Porraaaaaa');
  });

  it('Should click on the male checkbox and confirm if is checked', () => {
    cy.get('#formSexoMasc').click().should('be.checked');
    cy.get('#formSexoFem').should('not.be.checked');

    cy.get('[name=formSexo]').should('have.length', 2);
  });

  it('Should interact with combo input and select an option', () => {
    cy.get('[data-test="dataEscolaridade"]')
      .select('Superior')
      .should('have.value', 'superior');
  });

  it('Should click on delay button and check if the input was rendered', () => {
    cy.get('#novoCampo').should('not.exist');
    cy.get('#buttonDelay').click();
    cy.get('#novoCampo').should('not.exist');
    cy.get('#novoCampo').should('exist').type('Funcionou!');
  });

  it('Click on button Listar and render the asyncronous list', () => {
    cy.get('#buttonList').click();
    cy.get('#lista > :nth-child(1) > span').should('not.exist');
    cy.get('#lista > :nth-child(2) > span').should('not.exist');
    cy.get('#lista > :nth-child(1) > span').should('exist');
    cy.get('#lista > :nth-child(2) > span').should('not.exist');
    cy.get('#lista > :nth-child(2) > span').should('exist');
  });
});
