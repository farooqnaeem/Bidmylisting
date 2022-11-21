import faker from 'faker';

module.exports = {
  randomName: faker.lorem.words(2),
  randomEmail: faker.internet.email(),
  plgEmailSignup:
    'testplg' +
    faker.datatype.number(100000) +
    faker.datatype.number(100000) +
    '@sendoso.com',
  randomLastName: faker.name.lastName(0),
  randomFirstName: faker.name.firstName(0),
  randomJob: faker.name.jobTitle(),
  randomTouchName: faker.lorem.words(4).substring(5),
  randomContent: faker.lorem.words(20).substring(5),
  letterheadProductName: faker.lorem.words(4).substring(5),
  randomNotes: faker.lorem.words(25).substring(3),
  randomVendorName: faker.company.companyName(),
  randomPrice: faker.commerce.price(1, 100, 0, '$').toString(),
  randomProductName: faker.commerce.productName(),
  randomProductDescription: faker.commerce.productDescription(),
  randomBrandName: faker.company.bsBuzz(),
  randomURL: faker.internet.url(),
  randomNumber: faker.datatype.number({ min: 1, max: 100000 }),
  randomCost: faker.datatype.number({ min: 1, max: 1000 }).toString()
};
