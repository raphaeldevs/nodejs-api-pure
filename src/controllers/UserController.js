const users = require('../mocks/users')

module.exports = {
  listUsers(request, response) {
    const { order } = request.query

    const sortedUsers = [...users].sort((foo, bar) => {
      if (order === 'desc') return bar.id - foo.id

      return foo.id - bar.id
    })

    response.writeHead(200, {
      'Content-Type': 'application/json'
    })

    return response.end(JSON.stringify(sortedUsers))
  }
}
