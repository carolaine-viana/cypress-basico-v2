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
  }).its("body.token").should("not.be.empty")
    .then((token) => {
      return token;
    });
});

Cypress.Commands.add("resetRest", (token) => {
  cy.request({
    method: "GET",
    url: "/reset",
    headers: { Authorization: `JWT ${token}` },
    followRedirect: false,
  }).its('status').should('be.equal', 200)
});


Cypress.Commands.add("getAccountByName", (token, name) => {
  cy.request({
    method: "GET",
    url: "/contas",
    headers: { Authorization: `JWT ${token}` },
    qs: {
      nome: name
    },
  }).then(res => {
    if(res.body.id){
      console.log('oi', res)
    }
  })
});
