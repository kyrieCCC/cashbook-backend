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
    async editUserInfo(params) {
        const { ctx, app } = this;
        try {
            let res = await app.mysql.update('user', {
                // 此处是传入一个对象，key表示对应的字段名，value表示update的新的值
                ...params
            }, { id: params.id }) // 添加where判断条件
            return res
        } catch (error) {
            console.log(error);
            return null
        }
    }
}
module.exports = UserService;
