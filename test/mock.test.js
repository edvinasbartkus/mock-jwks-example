const Lab = require('lab')
const { expect } = require('code')
const nock = require('nock')

const lab = exports.lab = Lab.script()
const { describe, test } = lab

const request = require('superagent')
const createJWKSMock = require('mock-jwks').default

describe('mock', () => {
  const jwksMock = createJWKSMock('https://google.com')

  test('will fail', async () => {
    await jwksMock.start()
    await jwksMock.stop()
    
    const scope = nock(`https://google.com/`)
      .get('/test')
      .reply(200, { access_token: 'abc' })

    const resp = await request('https://google.com/test')
    expect(resp.status).to.equal(200)
    expect(scope.isDone()).to.be.true()
  })
})