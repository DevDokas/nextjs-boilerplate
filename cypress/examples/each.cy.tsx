/// <reference types="cypress"/>

describe('Each', () => {
  beforeEach('Access the page', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  it('Deve selecionar todos usando each', () => {
    // Nome
    cy.get('#formNome').type('Igor');
    // Sobrenome
    cy.get('#formSobrenome').type('Gomes');

    // Sexo
    cy.get(`[name=formSexo][value=M]`).click();

    cy.get('[name=formComidaFavorita]').each((e) => {
      if (e.val() !== 'vegetariano') {
        cy.wrap(e).click();
      }
    });
    cy.get('#formCadastrar').click();
  });
});
