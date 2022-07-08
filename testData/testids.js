/*
* This JSON object contains all the data-test-id selectors that we will use in automation.
* 
* As developers update their code to use our data-test-id convention, we will only 
* need to update this file.
*/

module.exports = {
  homepage: {
    signin:             'data-testid=homepage-header-sign-in',
    homeownerRegister:  'data-testid=homepage-seller-register-link',
    agentRegister:      'data-testid=homepage-agent-register-link'
  },

  login: {
    emailLabel: 'text="Email"',
    emailInput: 'data-testid=signin-email-field',
    pwdLabel: 'text="Password"',
    pwdInput: 'data-testid=signin-password-field',
    showHide: 'button[aria-label="toggle password visibility"]',
    rememberMe: 'input[type="checkbox"]',
    forgotPwdLink: 'text=Forgot Password',
    forgotPwdDlg: '.MuiDialog-paper',
    submitBtn: 'data-testid=signin-submit',
    createAccount: 'button >> text=Create Account',
    createAgent: 'li >> text="I am an agent"',
    createSeller: 'li >> text="I am a homeowner"'
  },

  homeownerRegistration: {
    address:        'data-testid=homeowner-registration-step-1-address',
    nextButton:     'data-testid=step-layout-continue',
    // need element to validate correct address is displayed 
    enteredAddress: 'data-testid=homeowner-registration-step-2-address',
    listingAgentYes:'data-testid=homeowner-registration-step-3-option-Yes',
    listingAgentNo: 'data-testid=homeowner-registration-step-3-option-No',
    whenToSellASAP: 'data-testid=homeowner-registration-step-4-option-asap',
    whenToSell24:   'data-testid=homeowner-registration-step-4-option-between_two_and_four_weeks',
    whenToSell46:   'data-testid="homeowner-registration-step-4-option-between_four_and_six_weeks',
    whenToSell6plus:'data-testid=homeowner-registration-step-4-option-more_than_six_weeks',
    whenToSellBrowsing:'data-testid=homeowner-registration-step-4-option-browsing',
    buyingHomeYes:  'data-testid=homeowner-registration-step-5-option-true',
    buyingHomeNo:   'data-testid=homeowner-registration-step-5-option-false',
    firstName:      'data-testid=homeowner-registration-step-6-first-name',
    lastName:       'data-testid=homeowner-registration-step-6-last-name',
    emailInput:     'data-testid=homeowner-registration-step-6-email',
    emailInputConf: 'data-testid=homeowner-registration-step-6-email-repeat',
    phoneNumber:    'data-testid=homeowner-registration-step-6-phone',
    password:       'data-testid=homeowner-registration-step-6-password',
    termCheckbox:   'data-testid=homeowner-registration-step-6-agree-terms',
    homePrice:      'data-testid=homeowner-registration-step-7-price',
    
  },

  // TODO
  preLoginFooter: {
  },

  // TODO
  preLoginHeader: {
  },
};
