/// <reference types="cypress"/>

describe('', () => {
  beforeEach('Access the page', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  it('Should change the current time and date and render it on screen', () => {
    const date = new Date(2023, 4, 10, 4, 28, 20);
    cy.clock(date.getTime());

    cy.get('#buttonNow').click();

    cy.get('#resultado > span').should('exist').and('contain', '10/05/2023');
  });

  it.only('Goes to the future', () => {
    cy.get('#buttonTimePassed').click();
    cy.get('#resultado > span').should('not.be.empty');
    cy.get('#resultado > span')
      .invoke('text')
      .then((text) => {
        const toNumber = parseInt(text);
        cy.wrap(toNumber).should('be.greaterThan', 1683747521128);
      });
  });

  it.only('Using Tick', () => {
    cy.clock();
    cy.get('#buttonTimePassed').click();
    cy.get('#resultado > span')
      .invoke('text')
      .then((text) => {
        const toNumber = parseInt(text);
        cy.wrap(toNumber).should('lte', 0);
      });
    cy.tick(5000);
    cy.get('#buttonTimePassed').click();
    cy.get('#resultado > span')
      .invoke('text')
      .then((text) => {
        const toNumber = parseInt(text);
        cy.wrap(toNumber).should('gte', 5000);
      });
    cy.tick(10000);
    cy.get('#buttonTimePassed').click();
    cy.get('#resultado > span')
      .invoke('text')
      .then((text) => {
        const toNumber = parseInt(text);
        cy.wrap(toNumber).should('gte', 15000);
      });
  });
});
