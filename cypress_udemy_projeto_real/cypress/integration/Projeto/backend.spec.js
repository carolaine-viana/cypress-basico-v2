/// <reference types="Cypress" />
import dayjs from "dayjs"

describe("should teste at a functional level", () => {
  let token;

  before(() => {
    cy.getToken("carol@hotmail.com", "123").then((tkn) => {
      token = tkn;
    });
  });

  beforeEach(() => {
    cy.resetRest(token);
  });

  it("should create an account", () => {
    cy.request({
      method: "POST",
      url: "/contas",
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: "conta via rest",
      },
    }).as("response");

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(201);
      expect(res.body).to.have.property("id");
      expect(res.body).to.have.property("nome", "conta via rest");
    });
  });

  it("should update an account", () => {
    cy.request({
      method: "GET",
      url: "/contas",
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: "Conta para alterar",
      },
    }).then((res) => {
      cy.request({
        method: "PUT",
        url: `contas/${res.body[0].id}`,
        headers: { Authorization: `JWT ${token}` },
        body: {
          nome: "conta alterada via rest",
        },
      })
        .its("status")
        .should("be.equal", 200);
    });
  });

  it("should not create an account with same name", () => {
    cy.request({
      method: "POST",
      url: "/contas",
      headers: { Authorization: `JWT ${token}` },
      body: {
        nome: "Conta mesmo nome",
      },
      failOnStatusCode: false //qnd ele ver nao vai falhar o teste vai deixar o teste seguir
    }).as("response");

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body).to.have.property("error", "Já existe uma conta com esse nome!");
    });
  });

  it.only("should create a transaction", () => {
    //cy.getAccountByName(token, 'Conta para movimentacoes')
    cy.request({
      method: "GET",
      url: "/contas",
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: "Conta para alterar",
      },
    })
    .then(res => {
      cy.request({
        method: "POST",
        url: "/transacoes",
        failOnStatusCode: false,
        headers: { Authorization: `JWT ${token}` },
        body: {
          conta_id: res.body[0].id,
          data_pagamento: dayjs(new Date()).format('DD/MM/YYYY'),
          data_transacao: dayjs(new Date()).format('DD/MM/YYYY'),
          descricao: "desc",
          envolvido: "aq carol",
          status: true,
          tipo: "REC",
          valor: "123"
        },
      })
    }).as("response");
    cy.get("@response").its('status').should('be.equal', 201)
    cy.get("@response").its('body.id').should('exist')
  });

  it("should get balance", () => {});

  it("should remove a transaction", () => {});
});
