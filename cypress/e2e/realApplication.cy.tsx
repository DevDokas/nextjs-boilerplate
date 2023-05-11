/// <reference types="cypress"/>

import locator from '../support/locators';

describe('Testing the application e2e', () => {
  // Fetch fixture
  beforeEach('Fixture fetching', function () {
    cy.fixture('realApplicationFixture').then((info) => {
      this.userInfo = info;
    });
  });
  // Login
  beforeEach('Access the website and Login the account', function () {
    cy.visit('http://barrigareact.wcaquino.me');
    cy.login(locator.LOGIN.USER, locator.LOGIN.PASSWORD);
    cy.get(locator.LOGIN.BTN_LOGIN).click();
    cy.get(locator.TOAST.MESSAGE)
      .should('exist')
      .and('contain', `Bem vindo, ${this.userInfo.name}!`);
  });

  describe('', function () {
    it('Should go to Account page and create a new monetary account', function () {
      cy.get(locator.MENU.ACCOUNTS).click({ force: true });
      cy.get('.form-control').type('Test Account');
      cy.get('.btn').click();
      cy.get(locator.TOAST.MESSAGE)
        .should('exist')
        .and('contain', 'Conta inserida com sucesso!');
    });

    it('Should try to create an account with name already used', () => {
      cy.get(locator.MENU.ACCOUNTS).click({ force: true });
      cy.get('.form-control').type('Conta Principal');
      cy.get('.btn').click();
      cy.get(locator.TOAST.MESSAGE)
        .should('exist')
        .and('contain', 'status code 400');
    });

    it('Should change the monetary account name', function () {
      cy.get(locator.MENU.ACCOUNTS).click({ force: true });

      cy.xpath("//table/tbody/tr[contains(.,'Test Account')]/./td/a[1]/i")
        .should('exist')
        .click();
      cy.get('.form-control').type('{selectAll}{backspace}Conta de Teste');
      cy.get('.btn').click();
      cy.get(locator.TOAST.MESSAGE);
      cy.xpath("//table/tbody/tr[contains(.,'Conta de Teste')]").should(
        'exist'
      );
    });

    it('Try to delet an Account', function () {
      cy.get(locator.MENU.ACCOUNTS).click({ force: true });

      cy.xpath("//table/tbody/tr[contains(.,'Conta de Teste')]/./td/a[2]/i")
        .should('exist')
        .click();
      cy.get(locator.TOAST.MESSAGE)
        .should('exist')
        .and('contain', 'Conta excluída com sucesso!');
    });
  });

  describe.only('', function () {
    it('Should create a new movimentation in the account', function () {
      cy.get(':nth-child(2) > .nav-link > .fas').click();
      cy.get('#descricao').type('Despesas Luiz Antonio');
      cy.get('.col-4 > .form-control').type('500');
      cy.get('#envolvido').type('Luiz Antonio de Souza e Sousa');
      cy.get('.btn-primary').click();
      cy.get(locator.TOAST.MESSAGE).should('contain', 'inserida com sucesso');
    });

    it('Should delete a movimentation', function () {
      cy.get(':nth-child(3) > .nav-link > .fas').click();
      cy.xpath(
        '/html/body/div[1]/div/div/div[2]/div[2]/li[contains(., "Despesas Luiz Antonio")]/div/div[2]/a[2]/i'
      ).click({ multiple: true });
    });

    it('Should verify how much money I have in my account', () => {
      cy.xpath(
        '/html/body/div[1]/div/div/table/tbody/tr[contains(., "Conta Principal")]/td[contains(., "Conta Principal")]/following-sibling::td[contains(., "5.000,00")]'
      ).should('exist');
    });
  });
});
