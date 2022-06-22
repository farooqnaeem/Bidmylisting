/*
* This JSON object contains all the data-test-id selectors that we will use in automation.
* 
* As developers update their code to use our data-test-id convention, we will only 
* need to update this file.
*/

module.exports = {
  login: {
    emailLabel: 'text="Email"',
    emailInput: 'input[name="username"]',
    pwdLabel: 'text="Password"',
    pwdInput: 'input[name="password"]',
    showHide: 'button[aria-label="toggle password visibility"]',
    rememberMe: 'input[type="checkbox"]',
    forgotPwdLink: 'text=Forgot Password',
    forgotPwdDlg: '.MuiDialog-paper',
    submitBtn: 'button[type="submit"]',
    createAccount: 'button >> text=Create Account',
    createAgent: 'li >> text="I am an agent"',
    createSeller: 'li >> text="I am a homeowner"'
  },

  // TODO
  preLoginFooter: {
  },

  // TODO
  preLoginHeader: {
  },
};
