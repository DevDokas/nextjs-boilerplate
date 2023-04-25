/// <reference types="cypress" />

describe('Attention points about Cypress', () => {
  beforeEach('access site wcaquino', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  it('Alert', () => {
    cy.get('#alert').click();
    cy.on('window:alert', (msg) => {
      console.log(msg);
      expect(msg).to.be.equal('Alert Simples');
    });
  });

  it('Alert com mock', () => {
    const stub = cy.stub().as('Alerta');
    cy.on('window:alert', stub);
    cy.get('#alert')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Alert Simples');
      });
  });
});
