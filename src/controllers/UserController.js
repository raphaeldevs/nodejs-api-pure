const users = require('../mocks/users')

module.exports = {
  listUsers(request, response) {
    const { order } = request.query

    const sortedUsers = [...users].sort((foo, bar) => {
      if (order === 'desc') return bar.id - foo.id

      return foo.id - bar.id
    })

    return response.send(200, sortedUsers)
  },
  getUserById(request, response) {
    const { id } = request.params

    const user = users.find(user => user.id === Number(id))

    if (!user) {
      return response.send(404, {
        error: 'User not found'
      })
    }

    return response.send(200, user)
  }
}
