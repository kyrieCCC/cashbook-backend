'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
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
  async editUser() {
    const { ctx } = this;
    const { id, name } = ctx.request.body
    try {
      const res = await ctx.service.home.updateUser(id, name)
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
  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body
    try {
      const res = await ctx.service.home.deleteUser(id)
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
