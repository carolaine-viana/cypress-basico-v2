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
    cy.reload();
    cy.get("#resultado").should("not.have.text", "Voltou!");
    cy.contains("Voltar").click();
    cy.get("#resultado").should("have.text", "Voltou!");
    //forma 3
  });

  it("Campos de texto = Text Field", () => {
    //forma 1
    cy.get("#formNome")
      .type("Cypress test")
      .should("have.value", "Cypress test");
    //forma 2
    cy.get("#elementosForm\\:sugestoes")
      .type("Cypress test")
      .should("have.value", "Cypress test");
    //forma 3
    cy.get(
      "#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input"
    )
      .type("Cypress test")
      .should("have.value", "Cypress test");
    //forma 4
    cy.get("[data-cy=dataSobrenome]")
      .type("teste12345{backspace}")
      .should("have.value", "teste1234");
    //forma 4
    cy.get("#elementosForm\\:sugestoes")
      .type("error{selectall}acerto", { delay: 1000 })
      .should("have.value", "acerto");
  });

  it("Radio button", () => {
    //forma 1
    cy.get("#formSexoFem").click().should("be.checked");
    cy.get("#formSexoMasc").should("not.be.checked");
    //forma 2
    cy.get("[name='formSexo']").should("have.length", 2);
  });

  it("Checkbox button", () => {
    //forma 1
    cy.get("#formComidaPizza").click().should("be.checked");
    //forma 2
    cy.get("[name='formComidaFavorita']").click({ multiple: true });
    cy.get("#formComidaPizza").should("not.be.checked");
    cy.get("#formComidaVegetariana").should("be.checked");
  });

  it("Combo box", () => {
    //forma 1
    cy.get("[data-test=dataEscolaridade]")
      .select("2o grau completo")
      .should("have.value", "2graucomp");
    //forma 2
    cy.get("[data-test=dataEscolaridade]")
      .select("2graucomp")
      .should("have.value", "2graucomp");

    //forma 3
    cy.get("[data-test=dataEscolaridade]").then(($el) => {
      expect($el.val()).to.be.deep.equal(["natacao"]);
      console.log("aaa", $el.val());
    });
    cy.get("[data-test=dataEsportes]").invoke("val").should("eql", ["natacao"]);
  });

  it("Combo multiplo", () => {
    //forma 1
    cy.get("formEscolaridade").select(["superior"]);
    //forma 2
  });

  it("sync - deve aguardar elemento ficar disponivel", () => {
    //  forma 1
    cy.get("#buttonDelay").click();
    cy.get("#novoCampo").type("funciona");
    // forma 2
    cy.get("#novoCampo").should("not.exist");
    cy.get("#buttonDelay").click();
    cy.get("#novoCampo").should("not.exist");
    cy.get("#novoCampo").should("exist");
    cy.get("#novoCampo").type("funciona");
  });

  // it("Uso do find", () => {
  //   //forma 1
  //   cy.get("#buttonListDOM").click();
  //   cy.get("#lista li").find("span").should("contain", "Item 1");
  //   //forma 2
  //   cy.get("#buttonList").click();
  //   cy.get("#lista li span").should("contain", "Item 2");
  // });

  it("Time out", () => {
    //forma 1
    // cy.get("#buttonDelay").click()
    // cy.get("#novoCampo", {timeout: 1000}).should("exist");
    //forma 2
    cy.get("#buttonListDOM").click();
    // cy.wait(5000)
    cy.get("#lista li span", { timeout: 30000 }).should("have.length", 2);
  });

  it("then", () => {
    //forma 1
    cy.get("#buttonListDOM").click();
    cy.get("#lista li span", { timeout: 30000 })
      .then(($el) => {
        expect($el).to.have.length(1);
        return 2;
      })
      .and("eq", 2);
  });

  it("Helpers...", () => {
    // //forma 01
    const obj = { nome: "User", idade: 20 };
    expect(obj).to.have.property("nome");
    //forma 02
    const obj2 = { nome: "User", idade: 20 };
    cy.wrap(obj2).should("have.property", "nome");
    //forma 03
    cy.get("#formNome").type("funciona?");
    //forma 04
    cy.get("#formNome").then(($el) => {
      cy.wrap($el).type("funciona?");
    });
  });

  it("its...", () => {
    // //forma 01
    const obj = { nome: "User", idade: 20 };
    cy.wrap(obj).should("have.property", "nome", "User");
    //forma 02
    cy.wrap(obj).its("nome").should("be.equal", "User");
    //forma 03
    const obj2 = {
      nome: "User",
      idade: 20,
      endereco: { rua: "rua dos bobos" },
    };
    cy.wrap(obj2).its("endereco").should("have.property", "rua");
    cy.wrap(obj2)
      .its("endereco")
      .its("rua")
      .should("be.equal", "rua dos bobos");
    cy.wrap(obj2).its("endereco.rua").should("be.equal", "rua dos bobos");
    //forma 04
    cy.title().its("length").should("be.equal", 20);
  });

  it("invoke...", () => {
    //forma 01
    const getValue = () => 1;
    const soma = (a, b) => a + b;

    //essa funcao sera uma das propriedades do meu getvalue
    cy.wrap({ fn: getValue }).invoke("fn").should("be.equal", 1);

    cy.wrap({ fn: soma }).invoke("fn", 2, 5).should("be.equal", 7);
  });

  it("Alerts...", () => {
    cy.get("#alert").click();
    cy.on("window:alert", (msg) => {
      console.log(msg);
      expect(msg).to.be.eq("Alert Simples");
    });
  });

  it.only("Alerts com mock...", () => {
    const stub = cy.stub().as("alerta");
    cy.on("window:alert", stub);
    cy.get("#alert")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Alert Simples");
      });
  });

  it("Confirm", () => {
    const stub = cy.stub().as("alerta");
    cy.on("window:alert", stub);
    cy.get("#alert")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Alert Simples");
      });
  });

  it("desafio", () => {
    cy.get('#formNome').type('Carol')
    cy.get('#formCadastrar').click()
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns('Sobrenom é obrigatorio')
    })
  });

  it("pop-up", () => {
    cy.visit("https://wcaquino.me/cypress/frame.html")
    cy.get("#otherButton").click()
    cy.on("window:alert", msg => {
      expect(msg).to.be.equal('Click OK!')
    })
  });

  it("pop-up - verificar se foi invocado", () => {
    cy.visit("https://wcaquino.me/cypress/frame.html")
    cy.window().then(win => {
      cy.stub(win, 'open').as('Winopen')
    })
    // cy.get('#buttonPopUp').click()
    cy.get('@Winopen').should('be.called')
  });

  it.only("xpath", () => {
    cy.xpath('//input')
  });

  it.only('finds list items', () => {
    cy.xpath('//input[contains(@onClick, \'Francisco\')]')
  });
});
