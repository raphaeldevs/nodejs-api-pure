const http = require('http')

const routes = require('./routes')

const server = http.createServer((request, response) => {
  console.log(`📝 Receiving method request ${request.method} at ${request.url}`)

  const route = routes.find(
    route => route.endpoint === request.url && route.method === request.method
  )

  if (!route) {
    response.writeHead(404, {
      'Content-Type': 'text/html'
    })

    return response.end(`Cannot ${request.method} ${request.url}`)
  }

  return route.handler(request, response)
})

server.listen(3000, () =>
  console.log('🎈 Server started at http://localhost:3000')
)
