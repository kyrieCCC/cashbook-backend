// controller/user.js
'use strict';

const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png'

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
      const { username, password } = ctx.request.body; // 获取注册需要的参数
      if (!username || !password) {
          ctx.body = {
              code: 500,
              msg: "账号密码不能为空~",
              data: null
          }
          return 
      }
      const havaUserinfo = await ctx.service.user.getUserByName(username)
      if (havaUserinfo && havaUserinfo.id) {
        ctx.body = {
            code: 500,
            msg: "该用户已经存在！",
            data: null
        }
        return 
      }
      const res = await ctx.service.user.register({
          username,
          password,
          signature: '这个人很懒，什么都没有留下',
          avatar: defaultAvatar
      });
      if (res) {
        ctx.body = {
            code: 200,
            msg: "注册成功辣！",
            data: null
        }
      } else {
        ctx.body = {
            code: 500,
            msg: "注册失败~",
            data: null
        }
      }
    }
}

module.exports = UserController;
