/// <reference types="Cypress" />
import '../../support/commandsAccounts';

describe("should teste at a functional level", () => {
  const loc = require('../../support/locators');
  before(() => {
    cy.login('carol@hotmail.com', '123')
    cy.resetApp()
  })
  it("should create an account", () => {
    cy.acessarMenuConta()
    cy.inserirConta('teste qa')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!');
  })
  it("should upate an account", () => {
    cy.acessarMenuConta()
    cy.xpath(loc.ACCOUNTS.XP_BTN_UPDATE('teste qa')).click()
    cy.get(loc.ACCOUNTS.NAME)
    .clear()
    .type('Conta alterada')
    cy.get(loc.ACCOUNTS.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!');
  })

  it("should not create an account with same name", () => {
    cy.acessarMenuConta()

    cy.get(loc.ACCOUNTS.NAME).type('Conta alterada')
    cy.get(loc.ACCOUNTS.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  })

  it("should create a transaction", () => {
    cy.get(loc.MENU.TRANSACTIONS).click()
    cy.get(loc.TRANSACTIONS.DESCRIPTION).type('Desc')
    cy.get(loc.TRANSACTIONS.VALUE).type('123', {force: true})

    cy.get(loc.TRANSACTIONS.ACCOUNT).select('Conta alterada')
    cy.get(loc.TRANSACTIONS.INVOLVED).type('Inter')
    cy.get(loc.TRANSACTIONS.STATUS).click()
    cy.get(loc.TRANSACTIONS.BTN_SAVE).click()
    cy.get(loc.MESSAGE).should('contain', 'sucesso')

    cy.get(loc.EXTRACT.LINES).should('have.length', 7)
    cy.xpath(loc.EXTRACT.FN_XP_SEARCHVALUE('Desc', '123')).should('exist')
  })

  it("should get balance", () => {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.BALANCE.FN_XP_AMOUNT('Conta alterada')).should('contain', '123,00')
  })

  it("should remove a transaction", () => {
    cy.get(loc.MENU.EXTRACT).click()
    cy.xpath(loc.EXTRACT.FN_XP_REMOVE_ELEMENT('Movimentacao para extrato')).click()
    cy.get(loc.MESSAGE).should('contain', 'removida com sucesso')
  })
})