/// <reference types="Cypress" />

import { faker } from "@faker-js/faker"

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit(`./src/index.html`)
  })

  it.skip("verifica o título da aplicação", () => {
    cy.visit(`./src/index.html`)
      .title()
      .should("eq", "Central de Atendimento ao Cliente TAT")
  })

  it.skip("Preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").should("be.visible").type("Carolaine", { delay: 10 })
    cy.get("#lastName").should("be.visible").type("Viana")
    cy.get("#email").should("be.visible").type("carol@hotmail.com")
    cy.get("#open-text-area")
      .should("be.visible")
      .type(
        "é possível sobrescrever o delay padrão por outro valor (em milissegundos).",
        { delay: 10 }
      )
    cy.get("button").click()
    cy.get(".success")
      .should("have.text", "\n      Mensagem enviada com sucesso.\n    ")
      .should("be.visible")
  })

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#email").should("be.visible").type("carol")
    cy.get("button").click()
    cy.get(".error")
      .should("have.text", "\n      Valide os campos obrigatórios!\n    ")
      .should("be.visible")
  })

  it.skip("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#phone")
      .should("be.visible")
      .type("carol")
      .get("button")
      .click()
      .should("have.value", "")
    cy.get(".error")
      .should("have.text", "\n      Valide os campos obrigatórios!\n    ")
      .should("be.visible")
  })

  it.skip("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("carol")
      .should("have.value", "carol")
      .clear()
      .should("have.value", "")
    cy.get("button").click()
  })

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.", () => {
    cy.get("button").click()
    cy.get(".error")
      .should("have.text", "\n      Valide os campos obrigatórios!\n    ")
      .should("be.visible")
  })

  it.skip("envia o formuário com sucesso usando um comando customizado.", () => {
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

  it.skip("envia o formuário com sucesso identificando o botao pelo seu titulo", () => {
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

    cy.contains("button", "Enviar").click()
    cy.contains("strong", "Mensagem enviada com sucesso.").should("be.visible")
  })

  it.skip("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("select").select("youtube").should("have.value", "youtube")
  })

  it.skip("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("select").select("Mentoria").should("have.value", "mentoria")
  })

  it.skip("seleciona um produto (Blog) por seu índice", () => {
    cy.get("select").select(1).should("have.value", "blog")
  })

  it.skip("marca o tipo de atendimento Feedback", () => {
    cy.get('input[type="radio"]').check()
  })

  it.skip("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').check().should("be.checked")
    cy.get("label>input").each(($el, index, $list) => {
      cy.wrap($list).check().should("be.checked")
    })
  })

  it.skip("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="radio"]').check().should("be.checked")
    cy.get("label>input").each(($list) => {
      cy.wrap($list).check().should("be.checked")

      cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
    })
  })

  it.skip("2 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
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

    cy.get('#phone-checkbox').check().should("be.checked")
    cy.get("button").click()
    cy.get(".error").should("have.text", "\n      Valide os campos obrigatórios!\n    ").should("be.visible")
  })

  it.skip("seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')

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
  })

  it.skip("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })

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
    cy.contains("strong", "Mensagem enviada com sucesso.").should("be.visible")
  })

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get('http://localhost:52553/src/privacy.html').should('have.attr', 'target', '_blank')
  })
})
