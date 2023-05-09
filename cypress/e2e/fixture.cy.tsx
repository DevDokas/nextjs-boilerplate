/// <reference types="cypress"/>

// Ao usar this, utilizar função comum ao inves de Arrow Function

describe('Fixtures tests', () => {
  beforeEach('access site wcaquino', function () {
    cy.visit('https://wcaquino.me/cypress/componentes.html');
    cy.fixture('userData').then((user) => {
      this.user = user;
    });
  });

  it('Learning to use', function () {
    // Nome
    cy.get('#formNome').type(this.user.nome);
    // Sobrenome
    cy.get('#formSobrenome').type(this.user.sobrenome);

    // Sexo
    cy.get(`[name=formSexo][value=${this.user.sexo}]`).click();

    // Comida Favorita
    if (this.user.comida === 'carne') {
      cy.get('[name=formComidaFavorita][value=carne]').click();
    } else if (this.user.comida === 'frango') {
      cy.get('[name=formComidaFavorita][value=frango]').click();
    } else if (this.user.comida === 'pizza') {
      cy.get('[name=formComidaFavorita][value=pizza]').click();
    } else if (this.user.comida === 'vegetariano') {
      cy.get('[name=formComidaFavorita][value=vegetariano]').click();
    }

    // Escolaridade
    if (this.user.escolaridade === '1o grau incompleto') {
      cy.get('#formEscolaridade').select('1o grau incompleto');
    } else if (this.user.escolaridade === '1o grau completo') {
      cy.get('#formEscolaridade').select('1o grau completo');
    } else if (this.user.escolaridade === '2o grau incompleto') {
      cy.get('#formEscolaridade').select('2o grau incompleto');
    } else if (this.user.escolaridade === '2o grau completo') {
      cy.get('#formEscolaridade').select('2o grau completo');
    } else if (this.user.escolaridade === 'Superior') {
      cy.get('#formEscolaridade').select('Superior');
    } else if (this.user.escolaridade === 'Especializacao') {
      cy.get('#formEscolaridade').select('Especializacao');
    } else if (this.user.escolaridade === 'Mestrado') {
      cy.get('#formEscolaridade').select('Mestrado');
    } else if (this.user.escolaridade === 'Doutorado') {
      cy.get('#formEscolaridade').select('Doutorado');
    }

    // Esporte
    if (this.user.esportes === 'Natacao') {
      cy.get('#formEsportes').select('Natacao');
    } else if (this.user.esportes === 'Futebol') {
      cy.get('#formEsportes').select('Futebol');
    } else if (this.user.esportes === 'Corrida') {
      cy.get('#formEsportes').select('Corrida');
    } else if (this.user.esportes === 'Karate') {
      cy.get('#formEsportes').select('Karate');
    }

    // Sugestões
    cy.get('#elementosForm\\:sugestoes').type(this.user.sugestoes);

    // Enviar formulário
    cy.get('#formCadastrar').click();

    // Deu certo?
    cy.get('#resultado').then((e) => {
      cy.wrap(e).should('exist').and('contain', 'Cadastrado!');
    });
    cy.get('#descNome > span').should('contain', this.user.nome);
    cy.get('#descSobrenome > span').should('contain', this.user.sobrenome);
    cy.get('#descSexo > span').should('contain', this.user.sexo);
    cy.get('#descComida > span').should(
      'contain',
      this.user.comida.charAt(0).toUpperCase()
    );
    cy.get('#descEscolaridade > span');
    cy.get('#descEsportes > span');
    cy.get('#descSugestoes > span');
  });
});
