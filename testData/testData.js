const myDate = Date.now();
const loginPrefix = process.env.LOGIN_PREFIX ? process.env.LOGIN_PREFIX : 'qatest';

module.exports = {

    agentRegistration: {
      firstName:  'Agent',
      lastName:   'QA Automation',
      email:      `${loginPrefix}+agent-${myDate}@bidmylisting.com`,
      phone:      '9498888888',
      password:   'Agent2022!',
      zipcode:    '99669',
      license:    '12345678',
      brokerage:  'QA Brokerage',
      cardNumber: '4242424242424242'
    },
    
    listing1: {
      address:    '215 Corral Ave, Soldotna, AK 99669, USA',
      beds:       '3',
      baths:      '2',
      sqft:       '1986',
      condition:  'Good',
      price:      '250000',
      important:  '- line 1\n-line 2\n- line 3',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula dui ut ipsum facilisis imperdiet. Vestibulum varius velit vel massa luctus pellentesque. Nulla libero justo, luctus nec pharetra eget, tristique at diam.\nMauris vehicula, arcu sit amet condimentum vehicula, nunc sem posuere libero, vel vehicula arcu nisi fringilla neque. Fusce cursus nunc eu vehicula viverra. Maecenas eget ex ut est interdum molestie eu at tortor. Vestibulum hendrerit porttitor nisi sed condimentum. Nulla non dolor suscipit, eleifend lacus eget, mollis lectus. Integer efficitur tincidunt molestie. Donec quis venenatis velit, a vehicula urna. Phasellus eget quam nibh. Duis et consectetur leo.'
    },

    listing2: {
      address:    '223 Corral Ave, Soldotna, AK 99669, USA',
      beds:       '3',
      baths:      '6',
      sqft:       '2100',
      condition:  'Excellent',
      price:      '385000',
      important:  '- line 1\n-line 2\n- line 3',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vehicula dui ut ipsum facilisis imperdiet. Vestibulum varius velit vel massa luctus pellentesque. Nulla libero justo, luctus nec pharetra eget, tristique at diam.'
    }
  };