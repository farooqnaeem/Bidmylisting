// @ts-check
const { devices } = require('@playwright/test');

const config = {
  headless: false,

  // Config for default test data
  testData: {
    userPrefix: 'lauren',
    firstName: 'Lauren',
    lastName: 'Automation',
    address1: '640 Avenida Colima, Santa Fe, NM 87506, USA',
    address2: '1824 Hopi Rd, Santa Fe, NM 87501, USA'
  },
};

module.exports = config;
