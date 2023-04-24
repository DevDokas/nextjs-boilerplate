/// <reference types="cypress"/>

describe('Interact with google site', () => {
  beforeEach('Visit the Google site', () => {
    cy.visit('https://google.com');
  });

  it('Should select the searchbar and make a search', () => {
    cy.get('#APjFqb').then((e) => {
      cy.wrap(e).type('Funcionou{enter}');
    });
  });
});
