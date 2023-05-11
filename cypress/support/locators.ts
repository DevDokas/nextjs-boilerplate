const locators = {
  // cy.get
  LOGIN: {
    USER: '[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN_LOGIN: '.btn[type="submit"]'
  },
  TOAST: {
    MESSAGE: '.toast-message'
  },
  MENU: {
    ACCOUNTS: '[href="/contas"]'
  }

  // cy.xpath
};

export default locators;
