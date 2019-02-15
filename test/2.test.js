const createJWKSMock = require('mock-jwks').default

const Lab = require('lab')
const { expect } = require('code')
const lab = exports.lab = Lab.script()
const { describe, before, after, it } = lab

const Server = require('../server')

describe('2', () => {
  let testServer
  const jwksMock = createJWKSMock('https://google.com')

  before(async () => {
    jwksMock.start()
    testServer = await Server()
  })

  after(async () => {
    await testServer.stop()
    await jwksMock.stop()
  })

  it('returns error if not authenticated', async () => {
    const opts = {
      method: 'GET',
      url: '/profile'
    }
    const res = await testServer.inject(opts)
    expect(res.statusCode).to.equal(401)
  })
})