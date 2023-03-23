/// <reference types="Cypress" />

describe("should teste at a functional level", () => {
  before(() => {
    cy.visit(`https://barrigareact.wcaquino.me`)
    cy.get('[data-test="email"]').type('carol@hotmail.com');
    cy.get('[data-test="passwd"]').type('123');
    cy.get('.btn').click();
    cy.get('.toast-message').should('contain', 'Bem vindo');
  })
  it("should create an account", () => {
    cy.get('[data-test="menu-settings"]').click()
    cy.get('[href="/contas"]').click()
    cy.get('[data-test="nome"]').type('nova conta123')
    cy.get('.btn').click()
    cy.get('.toast-message').should('contain', 'Conta inserida com sucesso!');
  })
  it("should upate an account", () => {
    cy.get('[data-test="menu-settings"]').click()
    cy.get('[href="/contas"]').click()
    cy.xpath("//table//td[contains(., 'atualizando...')]/..//i[@class='far fa-edit']").click()
    cy.get('[data-test="nome"]').clear()
    .type('atualizando...')
    cy.get('.btn').click()
    cy.get('.toast-message').should('contain', 'Conta inserida com sucesso!');
  })

  // it("inserir conta repetida", () => {
  //   cy.get('[data-test="menu-settings"]').click()
  //   cy.get('[href="/contas"]').click()
  //   cy.get('[data-test="nome"]').type('nova conta')
  //   cy.get('.btn').click()

  //   // cy.get('.toast-container').should("have.text", "Request failed with status code 400")
  // })

  // it("inserir movimentacao", () => {
  //   cy.get('[data-test="menu-movimentacao"] > .fas').click()
  //   cy.get('[data-test="descricao"]').type('teste qa')
  //   cy.get('[data-test="valor"]').type('100')
  //   cy.get('[data-test="envolvido"]').type('teste eu')
  //   cy.get('.btn-primary').click()
  // })

  // it("remover movimentacao", () => {
  //   cy.get('[data-test="menu-extrato"]').click()
  //   cy.get(':nth-child(2) > .row > .col > [href="#"] > .far').click()
  // })

})