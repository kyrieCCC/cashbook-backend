'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //添加一个路由
  router.post('/add', controller.home.add);
  router.get('/user', controller.home.user)
  router.post('/addUser', controller.home.addUser);
};
