const locators = {
  login: {
    USER: '[data-test="email"]',
    PASSWORD: '[data-test="passwd"]',
    BTN_LOGIN: '.btn'
  },
  MENU: {
    HOME: '[data-test=menu-home]',
    SETTINGS: '[data-test=menu-settings]',
    ACCOUNT: '[href="/contas"]',
    RESET: '[href="/reset"]',
    TRANSACTIONS: '[data-test=menu-movimentacao]',
    EXTRACT: '[data-test="menu-extrato"]'
  },
  ACCOUNTS: {
    NAME: '[data-test="nome',
    BTN_SAVE: '.btn',
    XP_BTN_UPDATE: (name) => `//td[contains(., '${name}')]/..//i[@class='far fa-edit']`
  },
  TRANSACTIONS: {
    ACCOUNT: '[data-test=conta]',
    DESCRIPTION: '[data-test=descricao]',
    VALUE: 'input[title="Valor"]',
    INVOLVED: '[data-test=envolvido]',
    STATUS: '[data-test=status]',
    BTN_SAVE: '.btn-primary',
  },
  EXTRACT: {
    LINES: '.list-group > li',
    FN_XP_SEARCHVALUE: (name, value) => `//span[contains(., '${name}')]/following-sibling::small[contains(., '${value}')]`,
    FN_XP_REMOVE_ELEMENT: (account) => `//span[contains(., '${account}')]/../../..//i[@class='far fa-trash-alt']`,
    FN_XP_EDIT_ELEMENT: (account) => `//span[contains(., '${account}')]/../../..//i[@class='fas fa-edit']`,
    FN_XP_LINE: (desc) => `//span[contains(., '${desc}')]/../../../..`
  },
  BALANCE: {
    FN_XP_AMOUNT: (name) => `//td[contains(., '${name}')]/../td[2]`
  },
  MESSAGE: '.toast-message'
}

export default locators;