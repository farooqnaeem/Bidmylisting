// @ts-check

require('dotenv').config();

if (process.env.BML_ENV == 'CI') {
  module.exports = require('./playwright.ci.config');
} else if (process.env.BML_ENV == 'QA') {
  module.exports = require('./playwright.qa.config');
} else if (process.env.BML_ENV == 'PROD') {
  module.exports = require('./playwright.prod.config');
} else { 
  const config = require('./playwright.qa.config');
  const local = require('./playwright.local.config');
  module.exports = Object.assign({}, config, local);
}