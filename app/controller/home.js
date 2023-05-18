'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  // async index() {
  //   const { ctx } = this;
  //   const { id } = ctx.query
  //   if (id === undefined) {
  //     ctx.body = '你没有传入查询参数'
  //   }
  //   else {
  //     ctx.body = `我获取到了你传入的id参数, id = ${id}`
  //   }
  //   // ctx.body = 'hi, egg';
  // }
  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    ctx.body = { title };
  }
  async user() {
    const { ctx } = this;
    const res = await ctx.service.home.user();
    ctx.body = res
  }
  async index() {
    const { ctx } = this;
    await ctx.render('index.html', {
      title: 'i am Kyriechen'
    })
  }
  async addUser() {
    const { ctx } = this;
    const { id, name } = ctx.request.body
    try {
      const res = await ctx.service.home.add_user(id, name)
      ctx.body = {
        code: 200,
        msg: 'success',
        data: null
      }
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: 'fail',
        data: null
      }
    }
  }
}

module.exports = HomeController;
