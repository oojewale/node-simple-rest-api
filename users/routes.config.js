const UsersController = require('./controllers/users.controller');
const config = require('../common/config/env.config');

exports.routesConfig = function (app) {
  app.post('/users', [
    UsersController.insert
  ]);

  app.get('/users/:userId', [
    UsersController.getById
  ]);
};
