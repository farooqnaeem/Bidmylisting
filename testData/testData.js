const myDate = Date.now();

module.exports = {
    homeowner: {
      email:    'jason+ho-ci@bidmylisting.com',
      password: 'BMLpassword2022!'
    },

    homeownerRegistration: {
      address:    '219 Corral Ave, Soldotna, AK 99669, USA',
      firstName:  'Homeowner',
      lastName:   'QA',
      email:      'qa+ho-' + myDate + '@bidmylisting.com',
      phone:      '7144444444',
      password:   'Homeowner2022!',
      homePrice:  '200000',
      description:'Bring me some buyers...'
    },

    agentRegistration: {
      firstName:  'Agent',
      lastName:   'QA',
      email:      'qa+agent-' + myDate + '@bidmylisting.com',
      phone:      '9498888888',
      password:   'Agent2022!',
      zipcode:    '99669',
      license:    '12345678',
      brokerage:  'QA Brokerage'
    }
  };