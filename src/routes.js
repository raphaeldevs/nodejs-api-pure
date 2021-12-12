const UserController = require('./controllers/UserController')

module.exports = [
  {
    method: 'GET',
    endpoint: '/users',
    handler: UserController.listUsers
  },
  {
    method: 'GET',
    endpoint: '/users/:id',
    handler: UserController.getUserById
  },
  {
    method: 'POST',
    endpoint: '/users',
    handler: UserController.createUser
  }
]
