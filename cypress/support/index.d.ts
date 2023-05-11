/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    // e2e
    login(user: string, passwd: string): Chainable<Element>;

    // Components
    testComponent(): Chainable<Element>;
  }
}
