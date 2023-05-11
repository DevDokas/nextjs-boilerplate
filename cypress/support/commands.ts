/// <reference types="cypress" />

import '@cypress/xpath';
// e2e Commands
Cypress.Commands.add('login', function (user, passwd) {
  cy.get(user).type(this.userInfo.email);
  cy.get(passwd).type(this.userInfo.password);
});
// Component Commands
