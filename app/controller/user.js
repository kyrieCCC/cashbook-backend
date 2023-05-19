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
    async login() {
        const { ctx, app } = this
        const { username, password } = ctx.request.body
        const havaUserinfo = await ctx.service.user.getUserByName(username)
        if (!havaUserinfo || !havaUserinfo.id) {
            ctx.body = {
                code: 500,
                msg: '该用户不存在',
                data: null
            }
            return 
        }
        if (havaUserinfo && havaUserinfo.password != password) {
            ctx.body = {
                code: 500,
                msg: '密码错误',
                data: null
            }
            return
        }
        const token = app.jwt.sign({
            id: havaUserinfo.id,
            username: havaUserinfo.username,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24hour
        }, app.config.jwt.secret)
        ctx.body = {
            code: 200,
            msg: '登录成功',
            data: {
                token
            }
        }
    }
    async test_token() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization
        const decodeToken = await app.jwt.verify(token, app.config.jwt.secret)
        ctx.body = {
            code: 200,
            msg: '解析成功',
            data: {
                ...decodeToken
            }
        }
    }
    async getUserInfo() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization;
        const decodeToken = await app.jwt.verify(token, app.config.jwt.secret)
        const userInfo = await ctx.service.user.getUserByName(decodeToken.username)
        ctx.body = {
            code: 200,
            msg: '解析成功',
            data: {
                id: userInfo.id,
                username: userInfo.username,
                signature: userInfo.signature || '',
                avatar: userInfo.avatar || defaultAvatar
            }
        }
    }
    async editUserInfo() {
        const { ctx, app } = this;
        const { signature = '', avatar = '' } = ctx.request.body
        
        try {
            let user_id
            const token = ctx.request.header.authorization
            const decodeToken = await app.jwt.verify(token, app.config.jwt.secret)
            if (!decodeToken) {
                return
            }
            user_id = decodeToken.id
            const userInfo = await ctx.service.user.getUserByName(decodeToken.username)
            const res = await ctx.service.user.editUserInfo({
                ...userInfo,
                signature,
                avatar
            });
            ctx.body = {
                code: 200,
                msg: 'success',
                data: {
                    id: user_id,
                    signature,
                    username: userInfo.username,
                    avatar
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController;
