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

  it('iFrame', () => {
    cy.get('#frame1').then((iframe) => {
      const body = iframe.contents().find('body');
      cy.wrap(body)
        .find('#tfield')
        .type('Hello World!')
        .should('have.value', 'Hello World!');
    });
  });

  it('Popup', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('winOpen');
    });
    cy.get('#buttonPopUp').click();
    cy.get('@winOpen').should('be.called');
  });

  it('Popup but with Links...', () => {
    cy.contains('Popup2')
      .should('have.prop', 'href')
      .and('contain', 'https://wcaquino.me/cypress/frame.html');
  });

  it('Access Popup dinamically', () => {
    cy.contains('Popup2').then((a: any) => {
      const href = a.prop('href');
      cy.visit(href);
    });
    cy.get('#tfield').type('Testando').should('have.value', 'Testando');
  });

  it('Should force cypress to work on the same page', () => {
    cy.contains('Popup2').invoke('removeAttr', 'target').click();
    cy.get('#tfield').type('Testando').should('have.value', 'Testando');
  });
});

/* describe('Desafio', () => {
  beforeEach('access site wcaquino', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  it('Validar formulario', () => {
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
}); */
