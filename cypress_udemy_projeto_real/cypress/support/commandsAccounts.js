import loc from '../support/locators';

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.ACCOUNT).click()
})

Cypress.Commands.add('inserirConta', conta => {
    cy.get(loc.ACCOUNTS.NAME).type(conta)
    cy.get(loc.ACCOUNTS.BTN_SAVE).click()
})

