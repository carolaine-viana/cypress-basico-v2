import loc from '../support/locators';

Cypress.Commands.add('login', (user, psw) => {
  cy.visit(`https://barrigareact.wcaquino.me`)
    cy.get(loc.login.USER).type(user);
    cy.get(loc.login.PASSWORD).type(psw);
    cy.get(loc.login.BTN_LOGIN).click();
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo');
})

Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
})