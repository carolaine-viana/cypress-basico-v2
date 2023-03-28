/// <reference types="Cypress" />
import "../../support/commandsAccounts";
import buildEnv from "../../support/buildEnv";
import dayjs from "dayjs";

describe("should teste at a functional level", () => {
  const loc = require("../../support/locators");
  after(() => {
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    buildEnv();
    cy.login("carol@hotmail.com", "123");
    cy.get(loc.MENU.HOME).click();
    cy.resetApp();
  });

  it("should test responsiveness", () => {
    cy.get('[data-test="menu-home"]').should('exist')
    .and('be.visible')

    cy.viewport('iphone-5')
    cy.get('[data-test="menu-home"]').should('exist')
    .and('be.not.visible')

    cy.viewport('ipad-2')
    cy.get('[data-test="menu-home"]').should('exist')
    .and('be.visible')
  })

  it("should create an account", () => {
    cy.intercept("POST", `/contas`, {
      statusCode: 200,
      body: {
        id: 3,
        nome: "teste qa",
        visivel: true,
        usuario_id: 1,
      },
    }).as("saveConta");

    cy.acessarMenuConta();

    cy.intercept("GET", `/contas`, {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: "Carteira",
          visivel: true,
          usuario_id: 1,
        },
        {
          id: 2,
          nome: "Banco",
          visivel: true,
          usuario_id: 1,
        },
        {
          id: 3,
          nome: "teste qa",
          visivel: true,
          usuario_id: 1,
        },
      ],
    }).as("contasSave");

    cy.inserirConta("teste qa");
    cy.get(loc.MESSAGE).should("contain", "Conta inserida com sucesso!");
  });

  it("should upate an account", () => {
    cy.intercept("PUT", `/contas/**`, {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: "Conta alterada",
          visivel: true,
          usuario_id: 1,
        },
      ],
    });

    cy.acessarMenuConta();
    cy.xpath(loc.ACCOUNTS.XP_BTN_UPDATE("Carteira")).click();
    cy.get(loc.ACCOUNTS.NAME).clear().type("Conta alterada");
    cy.get(loc.ACCOUNTS.BTN_SAVE).click();
    cy.get(loc.MESSAGE).should("contain", "Conta atualizada com sucesso!");
  });

  it("should not create an account with same name", () => {
    cy.intercept("POST", `/contas`, {
      statusCode: 400,
      body: [
        {
          error: "Já existe uma conta com esse nome!",
        },
      ],
    }).as("saveContaMesmoNome");

    cy.acessarMenuConta();

    cy.get(loc.ACCOUNTS.NAME).type("Conta mesmo nome");
    cy.get(loc.ACCOUNTS.BTN_SAVE).click();
    cy.get(loc.MESSAGE).should("contain", "code 400");
  });

  it("should create a transaction", () => {
    cy.intercept("POST", `/transacoes`, {
      statusCode: 200,
      body: [
        {
          id: 1232,
          status: true,
          data_transacao: dayjs(new Date()).format("DD/MM/YYYY"),
          data_pagamento: dayjs(new Date()).format("DD/MM/YYYY"),
          descricao: "Desc",
          envolvido: "Inter",
          valor: "123",
          conta_id: "123",
        },
      ],
    }).as("saveContaMesmoNome");

    cy.intercept("GET", `/extrato/**`, {
      statusCode: 200,
      body: [
        {
          conta: "Conta para movimentacoes",
          id: 1572236,
          descricao: "Movimentacao para exclusao",
          envolvido: "AAA",
          observacao: null,
          tipo: "DESP",
          data_transacao: "2023-03-27T03:00:00.000Z",
          data_pagamento: "2023-03-27T03:00:00.000Z",
          valor: "-1500.00",
          status: true,
          conta_id: 1679983,
          usuario_id: 37298,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: "Conta com movimentacao",
          id: 1572237,
          descricao: "Movimentacao de conta",
          envolvido: "BBB",
          observacao: null,
          tipo: "DESP",
          data_transacao: "2023-03-27T03:00:00.000Z",
          data_pagamento: "2023-03-27T03:00:00.000Z",
          valor: "-1500.00",
          status: true,
          conta_id: 1679984,
          usuario_id: 37298,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: "Conta para saldo",
          id: 1572238,
          descricao: "Movimentacao 1, calculo saldo",
          envolvido: "CCC",
          observacao: null,
          tipo: "REC",
          data_transacao: "2023-03-27T03:00:00.000Z",
          data_pagamento: "2023-03-27T03:00:00.000Z",
          valor: "3500.00",
          status: false,
          conta_id: 1679985,
          usuario_id: 37298,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: "Conta para saldo",
          id: 1572239,
          descricao: "Movimentacao 2, calculo saldo",
          envolvido: "DDD",
          observacao: null,
          tipo: "DESP",
          data_transacao: "2023-03-27T03:00:00.000Z",
          data_pagamento: "2023-03-27T03:00:00.000Z",
          valor: "-1000.00",
          status: true,
          conta_id: 1679985,
          usuario_id: 37298,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: "Conta para saldo",
          id: 1572240,
          descricao: "Movimentacao 3, calculo saldo",
          envolvido: "EEE",
          observacao: null,
          tipo: "REC",
          data_transacao: "2023-03-27T03:00:00.000Z",
          data_pagamento: "2023-03-27T03:00:00.000Z",
          valor: "1534.00",
          status: true,
          conta_id: 1679985,
          usuario_id: 37298,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: "Conta para extrato",
          id: 1572241,
          descricao: "Movimentacao para extrato",
          envolvido: "FFF",
          observacao: null,
          tipo: "DESP",
          data_transacao: "2023-03-27T03:00:00.000Z",
          data_pagamento: "2023-03-27T03:00:00.000Z",
          valor: "-220.00",
          status: true,
          conta_id: 1679986,
          usuario_id: 37298,
          transferencia_id: null,
          parcelamento_id: null,
        },
        {
          conta: "Conta para extrato",
          id: 1572241,
          descricao: "Desc",
          envolvido: "FFF",
          observacao: null,
          tipo: "DESP",
          data_transacao: "2023-03-27T03:00:00.000Z",
          data_pagamento: "2023-03-27T03:00:00.000Z",
          valor: "123",
          status: true,
          conta_id: 1679986,
          usuario_id: 37298,
          transferencia_id: null,
          parcelamento_id: null,
        },
      ],
    });
    
    cy.get(loc.MENU.TRANSACTIONS).click();
    cy.get(loc.TRANSACTIONS.DESCRIPTION).type("Desc");
    cy.get(loc.TRANSACTIONS.VALUE).type("123", { force: true });

    cy.get(loc.TRANSACTIONS.ACCOUNT).select("Banco");
    cy.get(loc.TRANSACTIONS.INVOLVED).type("Inter");
    cy.get(loc.TRANSACTIONS.STATUS).click();
    cy.get(loc.TRANSACTIONS.BTN_SAVE).click();
    cy.get(loc.MESSAGE).should("contain", "sucesso");


    cy.get(loc.EXTRACT.LINES).should("have.length", 7);
    cy.xpath(loc.EXTRACT.FN_XP_SEARCHVALUE("Desc", "123")).should("exist");
  });

  it("should get balance", () => {
    cy.intercept("GET", `/transacoes/**`, {
      body: {
        conta: "Conta para saldo",
        id: 1572240,
        descricao: "Movimentacao 3, calculo saldo",
        envolvido: "EEE",
        observacao: null,
        tipo: "REC",
        data_transacao: "2023-03-27T03:00:00.000Z",
        data_pagamento: "2023-03-27T03:00:00.000Z",
        valor: "1534.00",
        status: true,
        conta_id: 1679985,
        usuario_id: 37298,
        transferencia_id: null,
        parcelamento_id: null,
      },
    })

    cy.intercept("PUT", `/transacoes/**`, {
      body: {
        conta: "Conta para saldo",
        id: 1572240,
        descricao: "Movimentacao 3, calculo saldo",
        envolvido: "EEE",
        observacao: null,
        tipo: "REC",
        data_transacao: "2023-03-27T03:00:00.000Z",
        data_pagamento: "2023-03-27T03:00:00.000Z",
        valor: "1534.00",
        status: true,
        conta_id: 1679985,
        usuario_id: 37298,
        transferencia_id: null,
        parcelamento_id: null,
      },
    })

    cy.get(loc.MENU.HOME).click();
    cy.xpath(loc.BALANCE.FN_XP_AMOUNT("Carteira")).should(
      "contain",
      "1.000,00"
    );

    cy.get(loc.MENU.EXTRACT).click();
    cy.xpath(loc.EXTRACT.FN_XP_EDIT_ELEMENT("Movimentacao 3, calculo saldo")).click();

    cy.get(loc.TRANSACTIONS.DESCRIPTION).should(
      "have.value",
      "Movimentacao 3, calculo saldo"
    );
    cy.get(loc.TRANSACTIONS.STATUS).click();
    cy.get(loc.TRANSACTIONS.BTN_SAVE).click();
    cy.get(loc.MESSAGE).should("contain", "sucesso");

    cy.intercept('GET',
    `/saldo`,
    {
      statusCode: 200,
      body: [{
        conta_id: 999,
        conta: 'Carteira',
        saldo: '4.034,00'
      },
      {
        conta_id: 900090,
        conta: 'Banco',
        saldo: '1000000'
      },
    ]
    }
  ).as('saldoFinal')

    cy.get(loc.MENU.HOME).click();
    cy.xpath(loc.BALANCE.FN_XP_AMOUNT("Carteira")).should("contain", "4,03");
  });

  it("should remove a transaction", () => {
    cy.intercept("DELETE", `/transacoes/**`, {
      statusCode: 204,
      body: [
        {},
      ],
    }).as("del");

    cy.get(loc.MENU.EXTRACT).click();
    cy.xpath(
      loc.EXTRACT.FN_XP_REMOVE_ELEMENT("Movimentacao para exclusao")
    ).click();
    cy.get(loc.MESSAGE).should("contain", "removida com sucesso");
  });

  it("should valiate data send to create an account", () => {
    cy.intercept("POST", `/contas`, {
      statusCode: 200,
      body: {
        id: 3,
        nome: "teste qa",
        visivel: true,
        usuario_id: 1,
      },
      onRequest: req => {
        expect(req.body.nome).to.be.empty;
        expect(req.request.headers).to.have.property('Authorization');
      }
    }).as("saveConta");

    cy.acessarMenuConta();

    buildEnv();

    cy.inserirConta('{CONTROL}');

    cy.get(loc.MESSAGE).should("contain", "Conta inserida com sucesso!");
  })

  it("should test colors", () => {
    cy.intercept('GET',
    `/extrato/**`,
    {
      statusCode: 200,
      body: [
        {"conta":"Conta para movimentacoes","id":1572236,"descricao":"Receita paga","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2023-03-27T03:00:00.000Z","data_pagamento":"2023-03-27T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":1679983,"usuario_id":37298,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta com movimentacao","id":1572237,"descricao":"Receita pendente","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2023-03-27T03:00:00.000Z","data_pagamento":"2023-03-27T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":1679984,"usuario_id":37298,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":1572238,"descricao":"Despesa paga","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2023-03-27T03:00:00.000Z","data_pagamento":"2023-03-27T03:00:00.000Z","valor":"3500.00","status":true,"conta_id":1679985,"usuario_id":37298,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":1572239,"descricao":"Despesa pendente","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2023-03-27T03:00:00.000Z","data_pagamento":"2023-03-27T03:00:00.000Z","valor":"-1000.00","status":false,"conta_id":1679985,"usuario_id":37298,"transferencia_id":null,"parcelamento_id":null},
      ]
    }
    )
    cy.get(loc.MENU.EXTRACT).click()
    cy.xpath(loc.EXTRACT.FN_XP_LINE('Receita paga')).should('have.class', 'receitaPaga')
    cy.xpath(loc.EXTRACT.FN_XP_LINE('Receita pendente')).should('have.class', 'receitaPendente')
    cy.xpath(loc.EXTRACT.FN_XP_LINE('Despesa paga')).should('have.class', 'despesaPaga')
    cy.xpath(loc.EXTRACT.FN_XP_LINE('Despesa pendente')).should('have.class', 'despesaPendente')
  })
});
