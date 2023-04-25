/// <reference types="cypress" />

// Aprendizagem

interface Obj {
  a: string;
  b: number;
  c?: any;
}

type Arr = string[];

describe('Grupo de testes', () => {
  it('Equal', () => {
    const a = 1;

    expect(a, 'Deveria ser 1').equal(1);
  });

  it('Object equality', () => {
    const obj: Obj = {
      a: 'Igor',
      b: 24,
      c: null
    };

    const obj2: Obj = {
      a: 'Luiz Antonio',
      b: 1,
      c: null
    };

    expect(obj).not.to.be.equal(obj2);
    expect(obj).to.be.a('Object');
    expect(obj).to.have.property('b');
  });

  it('Arrays', () => {
    const arr: Arr = ['Igor', 'Rafael', 'Felipe'];

    expect(arr).to.have.members(['Igor', 'Rafael', 'Felipe']);
    expect(arr).to.include.members(['Igor']);
  });
});

describe('Cypress basics', () => {
  beforeEach('access site wcaquino', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
  });

  it('Should visit a page and assert title', () => {
    // deve visitar uma página e fazer uma assetiva no titulo

    cy.title().should('be.equal', 'Campo de Treinamento');

    let syncTitle: string;

    cy.title().then((title) => {
      console.log(title);

      syncTitle = title;

      cy.get('#elementosForm\\:sugestoes').type(title);
    });

    cy.get('[data-cy="dataSobrenome"]').then((ef) => {
      cy.wrap(ef).type(syncTitle);
    });
  });

  it('Click the first button and catch the value inside', () => {
    cy.get('#buttonSimple').should('have.value', 'Clique Me!');

    cy.get('#buttonSimple').click().should('have.value', 'Obrigado!');
  });

  it('Should select an input and write a text', () => {
    cy.get('#formNome').type('Ola Mundo');
  });
});
