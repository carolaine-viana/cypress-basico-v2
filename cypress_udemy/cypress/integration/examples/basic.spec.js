/// <reference types="Cypress" />

describe("Cypress basic", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });

  it("verifica o título da aplicação", () => {
    //cy.pause()
    cy.title().should("be.equal", "Campo de Treinamento");
  });

  it("should fin and interact with an element", () => {
    cy.get("#buttonSimple").click().should("have.value", "Obrigado!");
  });

  it("Text", () => {
    //forma 1
    cy.get("body").should("contain", "Cuidado");
    //forma 2
    cy.get("span").should("contain", "Cuidado");
    //forma 3
    cy.get(".facilAchar").should(
      "have.text",
      "Cuidado onde clica, muitas armadilhas..."
    );
  });

  it("Links", () => {
    //forma 1
    cy.get('[href="#"]').click();
    cy.get("#resultado").should("have.text", "Voltou!");

    //forma 2
    cy.reload()
    cy.get("#resultado").should("not.have.text", "Voltou!");
    cy.contains('Voltar').click()
    cy.get("#resultado").should("have.text", "Voltou!");
    //forma 3
  });

  it("Campos de texto = Text Field", () => {
    //forma 1
    cy.get('#formNome').type('Cypress test').should("have.value", "Cypress test");
    //forma 2
    cy.get('#elementosForm\\:sugestoes').type('Cypress test').should("have.value", "Cypress test");
    //forma 3
    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input').type('Cypress test').should("have.value", "Cypress test");
    //forma 4
    cy.get('[data-cy=dataSobrenome]').type('teste12345{backspace}').should("have.value", "teste1234");
    //forma 4
    cy.get('#elementosForm\\:sugestoes').type('error{selectall}acerto', {delay: 1000}).should("have.value", "acerto");
  });

  it("Radio button", () => {
    //forma 1
    cy.get('#formSexoFem').click().should('be.checked')
    cy.get('#formSexoMasc').should('not.be.checked')
    //forma 2
    cy.get("[name='formSexo']").should('have.length', 2)
  });

  it("Checkbox button", () => {
    //forma 1
    cy.get('#formComidaPizza').click().should('be.checked')
    //forma 2
    cy.get("[name='formComidaFavorita']").click({multiple: true})
    cy.get('#formComidaPizza').should('not.be.checked')
    cy.get('#formComidaVegetariana').should('be.checked')
  });

  it("Combo box", () => {
    //forma 1
    cy.get('[data-test=dataEscolaridade]')
    .select('2o grau completo')
    .should('have.value', '2graucomp')
    //forma 2
    cy.get('[data-test=dataEscolaridade]')
    .select('2graucomp')
    .should('have.value', '2graucomp')
  });

  it.only("Combo multiplo", () => {
    //forma 1
    cy.get('[data-testid=dataEsportes]').select(['natacao', 'Corrida'])
    //forma 2
  });
});
