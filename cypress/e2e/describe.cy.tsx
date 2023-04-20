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
  it('Should visit a page and assert title', () => {
    // deve visitar uma página e fazer uma assetiva no titulo
    cy.visit('https://wcaquino.me/cypress/componentes.html');

    cy.title().should('be.equal', 'Campo de Treinamento');
    /* const title = cy.title();
    console.log(title); */
  });
});
