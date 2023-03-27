/// <reference types="Cypress" />
import dayjs from "dayjs";

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
    cy.getAccountByName(token, "Conta para movimentacoes").then((id) => {
      cy.request({
        method: "PUT",
        url: `contas/${id}`,
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
      failOnStatusCode: false,
    }).as("response");

    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body).to.have.property(
        "error",
        "Já existe uma conta com esse nome!"
      );
    });
  });

  it("should create a transaction", () => {
    cy.getAccountByName(token, "Conta para movimentacoes")
      .then((id) => {
        cy.request({
          method: "POST",
          url: "/transacoes",
          failOnStatusCode: false,
          headers: { Authorization: `JWT ${token}` },
          body: {
            conta_id: `${id}`,
            data_pagamento: dayjs(new Date()).format("DD/MM/YYYY"),
            data_transacao: dayjs(new Date()).format("DD/MM/YYYY"),
            descricao: "desc",
            envolvido: "aq carol",
            status: true,
            tipo: "REC",
            valor: "123",
          },
        });
      })
      .as("response");
    cy.get("@response").its("status").should("be.equal", 201);
    cy.get("@response").its("body.id").should("exist");
  });

  it("should get balance", () => {
    cy.request({
      method: "GET",
      url: "/saldo",
      failOnStatusCode: false,
      headers: { Authorization: `JWT ${token}` },
    }).then((res) => {
      let saldoConta = null;
      res.body.forEach((c) => {
        if (c.conta === "Conta para saldo") saldoConta = c.saldo;
      });
      expect(saldoConta).to.be.equal("534.00");
    });

    cy.getTransactionByName(token, "Movimentacao 1, calculo saldo").then(
      (res) => {
        cy.request({
          method: "PUT",
          url: `/transacoes/${res.id}`,
          failOnStatusCode: false,
          headers: { Authorization: `JWT ${token}` },
          body: {
            status: true,
            data_transacao: dayjs(new Date()).format("DD/MM/YYYY"),
            data_pagamento: dayjs(new Date()).format("DD/MM/YYYY"),
            descricao: res.descricao,
            envolvido: res.envolvido,
            valor: res.valor,
            conta_id: res.conta_id,
          },
        })
          .its("status")
          .should("be.equal", 200);
      }
    );
    // //verificar se o saldo esta maior
    cy.request({
      method: "GET",
      url: "/saldo",
      failOnStatusCode: false,
      headers: { Authorization: `JWT ${token}` },
    }).then((res) => {
      let saldoConta = null;
      res.body.forEach((c) => {
        if (c.conta === "Conta para saldo") saldoConta = c.saldo;
      });
      expect(saldoConta).to.be.equal("4034.00");
    });
  });

  it.only("should remove a transaction", () => {
    cy.getTransactionByName(token, "Movimentacao para exclusao")
    .then((res) => {
      cy.request({
        method: "DELETE",
        url: `/transacoes/${res.id}`,
        failOnStatusCode: false,
        headers: { Authorization: `JWT ${token}` },
      })
    }).its('status').should('be.equal', 204)
  })
})
