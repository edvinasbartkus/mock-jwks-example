const Lab = require('lab')
const { expect } = require('code')
const nock = require('nock')

const lab = exports.lab = Lab.script()
const { describe, test, afterEach } = lab

const { makeRequest } = require('../index')

describe('3', () => {
  afterEach(() => nock.cleanAll())

  test('api call', async () => {
    const scope = nock(`https://google.com`)
      .get('/.well-known/jwks.json')
      .reply(200, { access_token: 'abc' })

    const content = await makeRequest('https://google.com/.well-known/jwks.json')
    console.log('Content: ', content)
    expect(JSON.parse(content)).to.equal({ access_token: 'abc' })
    expect(scope.isDone()).to.be.true()
  })
})