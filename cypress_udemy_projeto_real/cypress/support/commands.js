import loc from "../support/locators";

Cypress.Commands.add("login", (user, psw) => {
  cy.visit(`https://barrigareact.wcaquino.me`);
  cy.get(loc.login.USER).type(user);
  cy.get(loc.login.PASSWORD).type(psw);
  cy.get(loc.login.BTN_LOGIN).click();
  cy.get(loc.MESSAGE).should("contain", "Bem vindo");
});

Cypress.Commands.add("resetApp", () => {
  cy.get(loc.MENU.SETTINGS).click();
  cy.get(loc.MENU.RESET).click();
});

Cypress.Commands.add("getToken", (user, psw) => {
  cy.request({
    method: "POST",
    url: "/signin",
    body: {
      email: user,
      redirecionar: false,
      senha: psw,
    },
  })
    .its("body.token")
    .should("not.be.empty")
    .then((token) => {
      Cypress.env("token", token);
      return token;
    });
});

Cypress.Commands.add("resetRest", () => {
  cy.getToken("carol@hotmail.com", "123").then((token) => {
    cy.request({
      method: "GET",
      url: "/reset",
      headers: { Authorization: `JWT ${token}` },
      followRedirect: false,
    })
      .its("status")
      .should("be.equal", 200);
  });
});

Cypress.Commands.add("getAccountByName", (name) => {
  cy.getToken("carol@hotmail.com", "123").then((token) => {
    cy.request({
      method: "GET",
      url: "/contas",
      headers: { Authorization: `JWT ${token}` },
      qs: {
        nome: name,
      },
    }).then((res) => {
      return res.body[0].id;
    });
  });
});

Cypress.Commands.add("getTransactionByName", (name) => {
  cy.getToken("carol@hotmail.com", "123").then((token) => {
    cy.request({
      method: "GET",
      url: "/transacoes",
      headers: { Authorization: `JWT ${token}` },
      qs: {
        descricao: name,
      },
    }).then((res) => {
      return res.body[0];
    });
  });
});

Cypress.Commands.overwrite("request", (originalFn, ...options) => {
  if (options.length === 1) {
    if (Cypress.env("token")) {
      options[0].headers = {
        Authorization: `JWT ${Cypress.env("token")}`,
      };
    }
  }
  return originalFn(...options);
});
