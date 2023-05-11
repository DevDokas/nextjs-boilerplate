/// <reference types="cypress"/>

import './commands';

import '@cypress/xpath';

Cypress.SelectorPlayground.defaults({
  selectorPriority: [
    'id',
    'class',
    'attributes',
    'data-cy',
    'data-test',
    'data-testid',
    'tag',
    'nth-child'
  ]
});

// Commands

Cypress.Commands.add('login', function (user, passwd) {
  cy.get(user).type(this.userInfo.email);
  cy.get(passwd).type(this.userInfo.password);
});
