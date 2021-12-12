let users = require('../mocks/users')

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
  },
  createUser(request, response) {
    const { name } = request.body

    const newUser = {
      id: users.length + 1,
      name
    }

    users.push(newUser)

    return response.send(201, newUser)
  },
  updateUser(request, response) {
    const { id } = request.params
    const { name } = request.body

    const user = users.find(user => user.id === Number(id))

    if (!user) {
      return response.send(404, {
        error: 'User not found'
      })
    }

    user.name = name

    return response.send(200, user)
  },
  deleteUser(request, response) {
    const { id } = request.params

    const userAlreadyExists = Boolean(
      users.find(user => user.id === Number(id))
    )

    if (!userAlreadyExists) {
      return response.send(404, {
        error: 'User not found'
      })
    }

    users = users.filter(user => user.id !== Number(id))

    return response.send(204, {
      deleted: true
    })
  }
}
