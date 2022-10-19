const config = require('../../../playwright.config.js');
const myDate = Date.now();

// userPrefix - 
// Use this to override the 'qatest' prefix in the user email
const userPrefix = config?.testData?.userPrefix
  ? config.testData.userPrefix
  : 'qatest';

// override first name
const firstName = config?.testData?.firstName
  ? config.testData.firstName + ' Homeowner'
  : 'Homeowner';

// override last name
const lastName = config?.testData?.lastName
  ? config.testData.lastName
  : 'QA Automation'

// override listing address
const address = config?.testData?.address1 
  ? config.testData.address1 
  : '1222 26th Ave, Fairbanks, AK 99701, USA';

module.exports = {
  address: address,
  firstName: firstName,
  lastName: `${lastName}${myDate}`,
  email: `${userPrefix}+ho-${myDate}@bidmylisting.com`,
  phone: '7144444444',
  password: 'Homeowner2022!',
  homePrice: '200000',
  description:'Bring me some buyers...',
  importantInfo: '- item 1\n- item 2',
  beds: '3',
  baths: '2',
  squareFeet: '1285'  
}