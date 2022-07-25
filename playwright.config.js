// @ts-check

require('dotenv').config();

if (process.env.BML_CI) {
  module.exports = require('./playwright.ci.config');
} else if (process.env.BML_QA) {
  module.exports = require('./playwright.qa.config');
} else if (process.env.BML_PROD) {
  module.exports = require('./playwright.prod.config');
} else {
  module.exports = require('./playwright.ci.config');
}