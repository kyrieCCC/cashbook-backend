'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //添加一个路由
  router.get('/user/:id', controller.home.user);
  router.post('/add', controller.home.add);
};
