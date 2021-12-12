const UserController = require('./controllers/UserController')

module.exports = [
  {
    method: 'GET',
    endpoint: '/users',
    handler: UserController.listUsers
  }
]
