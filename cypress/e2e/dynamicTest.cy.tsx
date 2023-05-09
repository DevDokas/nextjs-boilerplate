/// <reference types="cypress"/>

describe('Dynamic Tests', () => {
  beforeEach('access site wcaquino', function () {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  const food = ['Carne', 'Frango', 'Pizza', 'Vegetariano'];

  const getRandomNum = (): number => {
    const min = Math.ceil(0);
    const max = Math.floor(food.length);
    return Math.floor(Math.random() * (max - min) + min);
  };

  it('', () => {});
});
