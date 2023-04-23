/// <reference types="cypress"/>

describe('Helpers examples', () => {
  describe('Wrap...', () => {
    describe('Learning how use Wrap', () => {
      it('Wrap', () => {
        const obj = {
          nome: 'User',
          idade: 20
        };
        expect(obj).to.have.property('nome');

        // Mesma coisa que ...
        cy.wrap(obj).should('have.property', 'nome');
      });

      // outro exemplo
      describe('Outro exemplo ...', () => {
        beforeEach('access site wcaquino', () => {
          cy.visit('https://wcaquino.me/cypress/componentes.html');
        });

        it('Visit and interact with element using cypress promisse and wrapping object', () => {
          cy.get('#formNome').then((el) => {
            cy.wrap(el).type('Funciona via Cypress');
          });
        });

        it('Should find two buttons and resolve a promise between the executions', () => {
          const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(10);
            }, 500);
          });

          cy.get('#buttonSimple').then(() => {
            console.log('Encontrei o primeiro botao');
          });
          cy.wrap(promise).then((ret) => {
            console.log(ret);
          });
          cy.get('#buttonList').then(() => {
            console.log('Encontrei o segundo botao');
          });
        });
      });
    });
  });

  describe('Its...', () => {
    it('Using Its', () => {
      const obj = { nome: 'Igor', idade: 24 };
      cy.wrap(obj).should('have.a.property', 'nome', 'Igor');
      cy.wrap(obj).its('nome').should('be.equal', 'Igor');

      const obj2 = {
        nome: 'Luiz Antonio',
        idade: 24,
        endereco: {
          rua: 'dos Bobos'
        }
      };
      cy.wrap(obj2)
        .its('endereco')
        .should('have.a.property', 'rua', 'dos Bobos');
      cy.wrap(obj2).its('endereco').its('rua').should('be.equal', 'dos Bobos');
      cy.wrap(obj2).its('endereco.rua').should('be.equal', 'dos Bobos');

      cy.visit('https://wcaquino.me/cypress/componentes.html');
      cy.title().its('length').should('equals', 20);
    });
  });

  describe('Invoke...', () => {
    it('Invoke...', () => {
      const getValue = (): number => 1;
      const soma = (a: number, b: number): number => a + b;

      cy.wrap({ fn: getValue }).invoke('fn');
      cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7);

      cy.visit('https://wcaquino.me/cypress/componentes.html');
      cy.get('#formNome')
        .invoke('val', 'Texto via Invoke')
        .should('have.value', 'Texto via Invoke');
      cy.window().invoke('alert', 'Da pra ver?');
      cy.get('#resultado').invoke(
        'html',
        '<input type="button" value="Hacked"/>'
      );
    });
  });
});
