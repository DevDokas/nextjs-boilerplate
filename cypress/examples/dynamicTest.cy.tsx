/// <reference types="cypress"/>

describe('Dynamic Tests', () => {
  beforeEach('access site wcaquino', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano'];
  foods.forEach((food) => {
    it(`Testando a comida ${food}`, () => {
      cy.xpath(
        `//label[contains(., '${food}')]/preceding-sibling::input`
      ).click();
      cy.get('#formCadastrar').click();
    });
  });
});
