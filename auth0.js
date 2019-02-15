const jwksRsa = require('jwks-rsa')

module.exports = {
  name: 'auth0',
  register: async server => {
    await server.register(require('hapi-auth-jwt2'))

    server.auth.strategy('jwt', 'jwt', {
      complete: true,
      key: jwksRsa.hapiJwt2KeyAsync({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://google.com/.well-known/jwks.json`
      }),
      verifyOptions: {
        issuer: 'https://google.com',
        algorithms: ['RS256']
      },
      validate: async decoded => {
        return {
          isValid: true,
          credentials: decoded
        }
      }
    })

    server.auth.default('jwt')
  }
}