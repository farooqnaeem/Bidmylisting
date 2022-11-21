const axios = require('axios').default;

class ApiRequest {
  async getResponse (url, header) {
    const response = await axios.get(url, {
      headers: header
    })
    return response;
  }

  async postData (url, body) {
    const response = await axios.post(url, body)
    return response
  }

  async postDataNew (url, body, accessToken) {
    const response = await axios.post(url, body, { headers: { Authorization: accessToken } })
    return response
  }

  async put (url, body, accessToken) {
    const response = await axios.put(url, body, { headers: { Authorization: accessToken } })
    return response
  }

  async delete (url, accessToken) {
    const response = await axios.delete(url, { headers: { Authorization: accessToken } })
    return response
  }
}
export default new ApiRequest()
