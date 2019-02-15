const request = require('request')
const makeRequest = address => {
  return new Promise(resolve => {
    request(address, (error, resp, body) => {
      resolve(body)
    })
  })
}

module.exports = {
  makeRequest
}
