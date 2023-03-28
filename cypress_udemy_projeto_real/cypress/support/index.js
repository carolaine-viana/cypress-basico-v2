
import './commands'
require('@cypress/xpath');

Cypress.SelectorPlayground.defaults({
  selectorPriority: ['data-wc', 'data-cy', 'data-test', 'data-testid', 'id', 'class', 'attributes', 'data-cy', 'data-test', 'data-testid', 'data-qa', 'tag', 'nth-child']
})