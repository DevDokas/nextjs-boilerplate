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

  it('Confirm', () => {
    cy.on('window:confirm', (msg) => {
      expect(msg).to.be.equal('Confirm Simples');
    });
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal('Confirmado');
    });
    cy.get('#confirm').click();
  });

  it('Deny', () => {
    cy.on('window:confirm', (msg) => {
      expect(msg).to.be.equal('Confirm Simples');
      return false;
    });
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal('Negado');
    });
    cy.get('#confirm').click();
  });

  it('Prompt', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('42');
    });
    cy.on('window:confirm', (msg) => {
      expect(msg).to.be.equal('Era 42?');
    });
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal(':D');
    });
    cy.get('#prompt').click();
  });
});

describe('Desafio', () => {
  beforeEach('access site wcaquino', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  it.only('Validar formulario', () => {
    const stub = cy.stub().as('Alert');
    cy.on('window:alert', stub);
    cy.get('#formCadastrar')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio');
      });
    cy.get('#formNome').type('Igor');
    cy.get('#formCadastrar')
      .click()
      .then(() => {
        expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio');
      });
    cy.get('[data-cy="dataSobrenome"]').type('Gomes');
    cy.get('#formCadastrar')
      .click()
      .then(() => {
        expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio');
      });
    cy.get('#formSexoMasc').click();
    cy.get('#formCadastrar').click();
    cy.get('body').contains('Cadastrado!');
  });
});
