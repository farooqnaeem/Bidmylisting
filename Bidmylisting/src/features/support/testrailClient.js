const axios = require('axios').default;

class TestRailClient {
  constructor (options) {
    this.uri = '/index.php?/api/v2';
    this.base = options.url.includes('https') ? `${options.url}${this.uri}` : `https://${options.url}${this.uri}`;
    this.username = options.username;
    this.password = options.password;
  }

  async addResultForCase (runId, caseId, status) {
    const url = `${this.base}/add_result_for_case/${runId}/${caseId}`;
    axios.post(url, {
      status_id: status
    }, {
      auth: {
        username: this.username,
        password: this.password
      }
    }).then(res => {
      return res
    }).catch(error => {
      const errJson = error.toJSON()
      const customError = {
        statusCode: errJson.status,
        url: errJson.config.url,
        message: errJson.message
      }
      console.error(JSON.stringify(customError, null, '\t'))
    });
  }
}
exports.TestRailClient = TestRailClient;
