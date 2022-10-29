
module.exports = {
  addressTitle:   'data-testid=step-layout',
  goBack:         'data-testid=step-layout-back',
  next:           'data-testid=step-layout-continue',
  skip:           'data-testid=step-layout-skip',
  addressLookup: {
    address:        'data-testid=homeowner-registration-address-lookup-step-address',
    zip:            'data-testid=homeowner-registration-address-lookup-step-zip',
  },
  propertyInformation: {   
    beds:           'data-testid=homeowner-registration-property-information-step-bedrooms',
    baths:          'data-testid=homeowner-registration-property-information-step-bathrooms',
    squareFeet:     'data-testid=homeowner-registration-property-information-step-square-feet', 
  },
  workingWithAnAgent: {
    selector:       'data-testid=homeowner-registration-working-with-an-agent-step-option-select',
    yes:            'data-testid=homeowner-registration-working-with-an-agent-step-option-Yes',
    no:             'data-testid=homeowner-registration-working-with-an-agent-step-option-No',
  },
  whenToSell: {
    selector:       'data-testid=homeowner-registration-selling-period-step-option-select',
    asap:           'data-testid=homeowner-registration-selling-period-step-option-asap',
    in24:           'data-testid=homeowner-registration-selling-period-step-option-asap',
    in46:           'data-testid=homeowner-registration-selling-period-step-option-between_four_and_six_weeks',
    in6plus:        'data-testid=homeowner-registration-selling-period-step-option-more_than_six_weeks',
    justBrowsing:   'data-testid=homeowner-registration-selling-period-step-option-browsing',
  },
  propertyCondition: {
    selector:       'data-testid=homeowner-radio-selections',
    perfect:        'data-testid=homeowner-radio-selections-perfect',
    good:           'data-testid=homeowner-radio-selections-good',
    fair:           'data-testid=homeowner-radio-selections-fair',
    needsWork:      'data-testid=homeowner-radio-selections-needs_work',
  },
  buyingHome: {
    selector:       'data-testid=homeowner-registration-buying-a-home-step-option-select',
    yes:            'data-testid=homeowner-registration-buying-a-home-step-option-true',
    no:             'data-testid=homeowner-registration-buying-a-home-step-option-false',
  },
  accountInfo: {
    firstName:      'data-testid=homeowner-registration-account-info-step-first-name',
    lastName:       'data-testid=homeowner-registration-account-info-step-last-name',
    email:          'data-testid=homeowner-registration-account-info-step-email',
    confirmEmail:   'data-testid=homeowner-registration-account-info-step-email-repeat',
    phoneNumber:    'data-testid=homeowner-registration-account-info-step-phone',
    password:       'data-testid=homeowner-registration-account-info-step-password',
    agreeCheckbox:  'data-testid=homeowner-registration-account-info-step-agree-terms',
    agreeLink:      'data-testid=homeowner-registration-account-info-step-terms'
  },
  listingPrice:     'data-testid=homeowner-registration-property-price-step-price',
  photoUpload: {
    image:          'data-testid=property-photo-step-img',
    chooseFile:     'data-testid=draggable-uploader-button',
  },
  listingDescription: {
    important:      'data-testid=homeowner-registration-listing-description-step-property-important-info',
    description:    'data-testid=homeowner-registration-listing-description-step-description',
    agreeCheckbox:  'data-testid=homeowner-registration-listing-description-step-ready-for-publish-checkbox',
  },
  checklist: {
    dialog:         'data-testid=confirmation-checklist-dialog',
    closeX:         'data-testid=confirmation-checklist-dialog-close',
    // don't use fixed data-testid for first 3 checkboxes b/c they are dynamic
    agreeCheckbox:  'data-testid=agreement-checkbox',
    agreeLink:      'data-testid=activate-confirmation-dialog-user-agreement',
    cancel:         'data-testid=confirmation-checklist-dialog-secondary-action',
    confirm:        'data-testid=confirmation-checklist-dialog-primary-action'
  },
};
