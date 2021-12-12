const http = require('http')
const url = require('url')

const routes = require('./routes')

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true)

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

  console.log(parsedUrl)

  request.query = parsedUrl.query

  return route.handler(request, response)
})

server.listen(3000, () =>
  console.log('🎈 Server started at http://localhost:3000')
)
