'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { id } = ctx.query
    if (id == undefined) {
      ctx.body = '你没有传入查询参数'
    }
    else {
      ctx.body = `我获取到了你传入的id参数, id = ${id}`
    }
    // ctx.body = 'hi, egg';
  }
  async user() {
    const { ctx } = this
    const { id } = ctx.params
    ctx.body = id
  }
  async add() {
    const { ctx } = this
    const { title } = ctx.request.body
    ctx.body = {title}
  }
}

module.exports = HomeController;
