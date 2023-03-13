/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit(`./src/index.html`)
  })

    it("verifica o título da aplicação", () => {
      cy.visit(`./src/index.html`).title().should("eq", "Central de Atendimento ao Cliente TAT")
    })

    it("Preenche os campos obrigatórios e envia o formulário", () =>{
      cy.get("#firstName").should("be.visible").type("Carolaine", { delay: 10 })
      cy.get("#lastName").should("be.visible").type("Viana")
      cy.get("#email").should("be.visible").type("carol@hotmail.com")
      cy.get("#open-text-area").should("be.visible").type(
          "é possível sobrescrever o delay padrão por outro valor (em milissegundos).", { delay: 10 }
        )
      cy.get("button").click()
      cy.get(".success").should("have.text", "\n      Mensagem enviada com sucesso.\n    ").should("be.visible")
    })

    it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
      cy.get("#email").should("be.visible").type("carol")
      cy.get("button").click()
     cy.get(".error").should("have.text", "\n      Valide os campos obrigatórios!\n    ").should("be.visible");
    })

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.get("#phone").should("be.visible").type("carol").get("button").click().should('have.value', '')
      cy.get(".error").should("have.text", "\n      Valide os campos obrigatórios!\n    ").should("be.visible");
    })

    it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
      cy.get("#firstName").type("carol").should('have.value', 'carol').clear().should('have.value', '')
      cy.get("button").click()
    })

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.", () => {
      cy.get("button").click()
      cy.get(".error").should("have.text", "\n      Valide os campos obrigatórios!\n    ").should("be.visible");
    })

    it("envia o formuário com sucesso usando um comando customizado.", () => {
      const fillMandatoryFieldsAndSubmit = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        openText: faker.hacker.phrase(),
      }

      cy.get("#firstName").type(fillMandatoryFieldsAndSubmit.firstName)
      cy.get("#lastName").type(fillMandatoryFieldsAndSubmit.lastName)
      cy.get("#email").type(fillMandatoryFieldsAndSubmit.email)

      cy.get("#open-text-area").type(fillMandatoryFieldsAndSubmit.openText)
      cy.get("button").click()
      cy.get(".success").should("have.text", "\n      Mensagem enviada com sucesso.\n    ").should("be.visible")
    })

    it("envia o formuário com sucesso identificando o botao pelo seu titulo", () => {
      const fillMandatoryFieldsAndSubmit = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        openText: faker.hacker.phrase(),
      }

      cy.get("#firstName").type(fillMandatoryFieldsAndSubmit.firstName)
      cy.get("#lastName").type(fillMandatoryFieldsAndSubmit.lastName)
      cy.get("#email").type(fillMandatoryFieldsAndSubmit.email)

      cy.get("#open-text-area").type(fillMandatoryFieldsAndSubmit.openText)
      cy.contains('button', 'Enviar').click()
      cy.contains('strong', 'Mensagem enviada com sucesso.').should("be.visible")
    })
});
