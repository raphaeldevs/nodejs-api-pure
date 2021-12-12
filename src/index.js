const http = require('http')

const { URL } = require('url')

const routes = require('./routes')

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)

  console.log(
    `📝 Receiving method request ${request.method} at ${parsedUrl.pathname}`
  )

  const route = routes.find(
    route =>
      route.endpoint === parsedUrl.pathname && route.method === request.method
  )

  if (!route) {
    response.writeHead(404, {
      'Content-Type': 'text/html'
    })

    return response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
  }

  request.query = Object.fromEntries(parsedUrl.searchParams)

  return route.handler(request, response)
})

server.listen(3000, () =>
  console.log('🎈 Server started at http://localhost:3000')
)
