//  service/user.js
'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 通过用户名获取用户信息
  async getUserByName(username) {
    const { app } = this;
      try {
        const result = await app.mysql.get('user', { username });
        return result;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    async register(params) {
        const { ctx } = this;
        try {
            const res = await this.app.mysql.insert('user', params)
            return res
        } catch (error) {
            console.log(error);
            return null
        }
    }
}
module.exports = UserService;
