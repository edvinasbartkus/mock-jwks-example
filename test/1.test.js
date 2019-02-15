const Lab = require('lab')
const { expect } = require('code')
const nock = require('nock')

const lab = exports.lab = Lab.script()
const { describe, test, afterEach } = lab

const { makeRequest } = require('../index')

describe('1', () => {
  afterEach(() => nock.cleanAll())

  test('api call', async () => {
    const scope = nock(`https://google.com`)
      .get('/test')
      .reply(200, { access_token: 'abc' })

    const resp = await makeRequest('https://google.com/test')
    expect(JSON.parse(resp)).to.equal({ access_token: 'abc' })
    expect(scope.isDone()).to.be.true()
  })
})