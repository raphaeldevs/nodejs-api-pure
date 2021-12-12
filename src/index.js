const http = require('http')

const { URL } = require('url')

const routes = require('./routes')

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)

  console.log(
    `📝 Receiving method request ${request.method} at ${parsedUrl.pathname}`
  )

  let { pathname } = parsedUrl
  let id = null

  const splitedEndpoint = pathname.split('/').filter(Boolean)

  if (splitedEndpoint.length > 1) {
    pathname = `/${splitedEndpoint[0]}/:id`
    id = splitedEndpoint[1]
  }

  const route = routes.find(
    route => route.endpoint === pathname && route.method === request.method
  )

  if (!route) {
    response.writeHead(404, {
      'Content-Type': 'text/html'
    })

    return response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
  }

  request.query = Object.fromEntries(parsedUrl.searchParams)
  request.params = { id }

  return route.handler(request, response)
})

server.listen(3000, () =>
  console.log('🎈 Server started at http://localhost:3000')
)
