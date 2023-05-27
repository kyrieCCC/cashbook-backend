'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret)

  router.get('/', controller.home.index);   
  //添加一个路由


  // 接口分类
  // 测试接口
  router.get('/user', controller.home.user);
  router.post('/add', controller.home.add);
  router.post('/addUser', controller.home.addUser);
  router.post('/editUser', controller.home.editUser);
  router.post('/deleteUser', controller.home.deleteUser);
  router.post('/test/upload', controller.upload.upload);

  // 用户接口
  router.get('/user/test', _jwt, controller.user.test_token);
  router.get('/user/getUserInfo', _jwt, controller.user.getUserInfo);
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.post('/user/editUserInfo', _jwt, controller.user.editUserInfo);

  // 账单接口
  router.post('/bill/add', _jwt, controller.bill.add);
  router.post('/bill/update', _jwt, controller.bill.update);
  router.post('/bill/delete', _jwt, controller.bill.delete);
  router.get('/bill/list', _jwt, controller.bill.list); // 获取帐单列表
  router.get('/bill/detail', _jwt, controller.bill.detail);
  router.get('/bill/data', _jwt, controller.bill.data); 

  // 消费类型接口
  router.get('/type/list', _jwt, controller.type.list); // 获取消费类型列表
};
