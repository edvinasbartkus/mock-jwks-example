const Hapi = require('hapi')
const auth0Plugin = require('./auth0')

const registerPlugins = async server => {
  await server.register([
    auth0Plugin
  ])
}

const registerRoutes = async server => {
  await server.route({
    method: 'GET',
    path: '/profile',
    config: {
      handler: async (request, h) => ({
        email: request.auth.credentials.email
      })
    }
  })
}


module.exports = async config => {
  const { host, port } = { host: 'localhost', port: 8800 }
  const server = Hapi.server({ host, port, routes: { cors: true } })

  await registerPlugins(server)
  await registerRoutes(server)

  return server
}