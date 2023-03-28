const buildEnv = () => {
    cy.intercept('GET',
    `/signin`,
    {
      statusCode: 200,
      body: {
        id: 1000,
        nome: 'usuario falso',
        token: 'uma string muito grande',
      }
    }
  )

  cy.intercept('GET',
    `/saldo`,
    {
      statusCode: 200,
      body: [{
        conta_id: 999,
        conta: 'Carteira',
        saldo: '1000'
      },
      {
        conta_id: 900090,
        conta: 'Banco',
        saldo: '1000000'
      },
    ]
    }
  ).as('saldo')

  cy.intercept('GET',
      `/contas`,
      {
        statusCode: 200,
        body: [{
          id: 1,
          nome: 'Carteira',
          visivel: true,
          usuario_id: 1
        },
        {
          id: 2,
          nome: 'Banco',
          visivel: true,
          usuario_id: 1
        }
      ]
      }
    ).as('contas')

    cy.intercept('GET',
      `/extrato/**`,
      {
        statusCode: 200,
        body: [
          {"conta":"Conta para movimentacoes","id":1572236,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2023-03-27T03:00:00.000Z","data_pagamento":"2023-03-27T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":1679983,"usuario_id":37298,"transferencia_id":null,"parcelamento_id":null},
          {"conta":"Conta com movimentacao","id":1572237,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2023-03-27T03:00:00.000Z","data_pagamento":"2023-03-27T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":1679984,"usuario_id":37298,"transferencia_id":null,"parcelamento_id":null},
          {"conta":"Conta para saldo","id":1572238,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2023-03-27T03:00:00.000Z","data_pagamento":"2023-03-27T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":1679985,"usuario_id":37298,"transferencia_id":null,"parcelamento_id":null},
          {"conta":"Conta para saldo","id":1572239,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2023-03-27T03:00:00.000Z","data_pagamento":"2023-03-27T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":1679985,"usuario_id":37298,"transferencia_id":null,"parcelamento_id":null},
          {"conta":"Conta para saldo","id":1572240,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2023-03-27T03:00:00.000Z","data_pagamento":"2023-03-27T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":1679985,"usuario_id":37298,"transferencia_id":null,"parcelamento_id":null},
          {"conta":"Conta para extrato","id":1572241,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2023-03-27T03:00:00.000Z","data_pagamento":"2023-03-27T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":1679986,"usuario_id":37298,"transferencia_id":null,"parcelamento_id":null}
        ]
      }
    )
}

export default buildEnv;

