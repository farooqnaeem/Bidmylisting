const config = require('../../../playwright.config.js');
const myDate = Date.now();

module.exports = {
  address: '1222 26th Ave, Fairbanks, AK 99701, USA',
  firstName: 'Homeowner',
  lastName: `QA Automation${myDate}`,
  email: `qatest+ho-${myDate}@bidmylisting.com`,
  phone: '7144444444',
  password: 'Homeowner2022!',
  homePrice: '200000',
  description:'Bring me some buyers...',
  importantInfo: '- item 1\n- item 2',
  beds: '3',
  baths: '2',
  squareFeet: '1285'  
}