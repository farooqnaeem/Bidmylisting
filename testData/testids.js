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

  agentRegistration: {
    firstName:      'data-testid=agent-registration-step-1-first-name',
    lastName:       'data-testid=agent-registration-step-1-last-name',
    email:          'data-testid=agent-registration-step-1-email',
    emailConf:      'data-testid=agent-registration-step-1-email-repeat',
    phoneNumber:    'data-testid=agent-registration-step-1-phone',
    zipcode:        'input[name="zip"]',
    password:       'data-testid=agent-registration-step-1-password',
    termCheckbox:   'input[type="checkbox"]',
    createBtn:      'data-testid=agent-registration-step-1-submit',
    skipPhoneVer:   'data-testid=step-layout-skip',
    brokerage:      'data-testid=agent-registration-step-3-brokerage-name',
    license:        'data-testid=agent-registration-step-3-license',
    state:          'data-testid=agent-registration-step-3-brokerage-name',
    address:        'data-testid=agent-registration-step-3-brokerage-address',
    submitBtn:      'data-testid=agent-registration-step-3-submit',
    nameCard:       'data-testid=agent-registration-step-4-card-name',
    cardNumber:     'input[name="cardnumber"]',
    // cardNumber:     'data-testid=agent-registration-step-4-card-container',
    expDate:        'input[name="exp-date"]',
    //expDate:        'data-testid=agent-registration-step-4-expiry-container',
    cvc:            'data-testid=agent-registration-step-4-cvc-container',
    finishBtn:      'data-testid=step-layout-continue'
  },

  
  hoDashboard: {
    newListingLink:       'data-testid=homeowner-right-menu-new-listing-link',
    listingOptions:       'data-testid=homeowner-right-menu-open-select',
    listingToggle:        'data-testid=homeowner-right-menu-selector-toggle-listing',
    listingChoices:       'data-testid=homeowner-right-menu-selector-options',
    viewDetailsBtn:       'data-testid=homeowner-right-menu-view-details-button',
    editListingBtn:       'data-testid=homeowner-right-menu-edit-listing-button',
    publishBtn:           'data-testid=homeowner-right-menu-publish-button',
    publishDialog:        'data-testid=seller-publish-dialog',
    publishDialogClose:   'data-testid=seller-publish-dialog-close',
    publishDialogCancel:  'data-testid=seller-publish-dialog-secondary-action',
    publishDialogActivate:'data-testid=seller-publish-dialog-primary-action'
  },

  navigation: {
    hoHome:       'data-testid=sidenav-item-list-redirect-link-homeowner',
    agentHome:    '',
    bids:         '',
    help:         'data-testid=sidenav-item-list-how-to-link',
    signout:      'data-testid=sidenav-item-list-logout-link',
    profile:      'data-testid=sidenav-item-list-account-settings-link'
  },

  newListing: {
    addressInput:       'data-testid=listing-step1-address',
    homeSizeInput:      'data-testid=',
    bedsInput:          'data-testid=listing-step1-bedrooms',
    bathsInput:         'data-testid=listing-step1-bathrooms',
    conditionNeedsWork: 'data-testid=listing-step1-condition-0',
    conditionFair:      'data-testid=listing-step1-condition-1',
    conditionGood:      'data-testid=listing-step1-condition-2',
    conditionVeryGood:  'data-testid=listing-step1-condition-3',
    conditionExcellent: 'data-testid=listing-step1-condition-4',
    step1Cancel:        'data-testid=listing-step1-cancel',
    step1Submit:        'data-testid=listing-step1-submit',
    priceInput:         'data-testid=listing-step2-price',
    step2Back:          'data-testid=listing-step2-back-button',
    step2Submit:        'data-testid=listing-step2-submit-button',
    importantInfoInput: 'data-testid=listing-step3-importantInfo-input',
    descriptionInput:   'data-testid=listing-step3-description-input',
    step3Back:          'data-testid=listing-step3-back-button',
    step3Submit:        'data-testid=listing-step3-submit-button'
  },

  marketingFunnel: {
    getStarted: {
      email:        'id=email-7adec560-5417-408e-9ded-543b8710653e',
      zip:          'id=zip-7adec560-5417-408e-9ded-543b8710653e',
      firstName:     'id=firstname-7adec560-5417-408e-9ded-543b8710653e',
      lastName:     'id=lastname-7adec560-5417-408e-9ded-543b8710653e',
      phoneNumber:  'id=phone-7adec560-5417-408e-9ded-543b8710653e',
      submit:       'input[type="submit"]'
    },
    recruitmentOptin: {
      registerBtn1: '#tmp_button-32469 >> a',
      registerBtn2: 'id=undefined-776-702',
      registerBtn3: 'id=undefined-776-100',
      registerBtn4: 'id=undefined-776-219',
      formDiv:      '#modalPopup',
      closeBtn:     '#modalPopup > div.closeLPModal > img'
    }
  }
};
