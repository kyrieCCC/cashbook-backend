'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret)

  router.get('/', controller.home.index);   
  //添加一个路由
  router.post('/add', controller.home.add);
  router.get('/user', controller.home.user)
  router.post('/addUser', controller.home.addUser);
  router.post('/editUser', controller.home.editUser);
  router.post('/deleteUser', controller.home.deleteUser);
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.get('/user/test', _jwt, controller.user.test_token);
};
