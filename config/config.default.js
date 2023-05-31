/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1684399021142_196';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: 'app/public/upload'
  };

  // file的文件接收形式
  config.multipart = {
    mode: 'file'
  };

  // 配置egg后端的跨域问题
  config.cors = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  
  
  // egg的安全措施CSRF
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };

  // 配置ejs
  config.view = {
    mapping: {'.html': 'ejs'}  // 左边写成.html后缀，会自动渲染.html文件
  };
  // jwt配置加密信息
  config.jwt = {
    secret: 'Kyrie'
  };

  // 配置mysql的连接信息
  exports.mysql = {
    client: {
      host: '106.15.78.110',
      port: '3306',
      user: 'root',
      database: 'egg_mysql',
      password: 'Wenlichen667.'
    },
    app: true,
    agent: false,
  }
  return {
    ...config,
    ...userConfig,
  };
};
