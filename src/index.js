const http = require('http')

const users = require('./mocks/users')

const server = http.createServer((request, response) => {
  console.log(`Receiving method request ${request.method} at ${request.url}`)

  if (request.url === '/' && request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })

    return response.end('<h1>Hello NodeJS!</h1>')
  }

  if (request.url === '/users' && request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'application/json'
    })

    return response.end(JSON.stringify(users))
  }

  response.writeHead(404, {
    'Content-Type': 'text/html'
  })
  return response.end(`Cannot ${request.method} ${request.url}`)
})

server.listen(3000, () =>
  console.log('🎈 Server started at http://localhost:3000')
)
