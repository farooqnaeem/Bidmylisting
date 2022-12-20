// @ts-check

require('dotenv').config();

if (process.env.BML_ENV == 'CI') {
  module.exports = require('./playwright.ci.config');
} else if (process.env.BML_ENV == 'PROD') {
  module.exports = require('./playwright.prod.config');
} else { 
  module.exports = require('./playwright.qa.config');
}