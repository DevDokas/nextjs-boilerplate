/// <reference types="cypress"/>

describe('Playing', () => {
  beforeEach('Access my website', () => {
    cy.visit('https://igordokai.com');
  });

  it('Should render the page', () => {
    cy.get('.sc-eDWCr').should('exist');
  });

  it('Test the ', () => {
    cy.get('.sc-fnGiBr').click();
  });
});
