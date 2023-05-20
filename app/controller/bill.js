'use strict';

const moment = require('moment')

const Controller = require('egg').Controller

class BillController extends Controller {
    async add() {
        const { ctx, app } = this;
        const { amount, type_id, type_name, date, pay_type, remark = '' } = ctx.request.body
        //判断是否参数为空
        if (!amount || !type_id || !type_name || !date || !pay_type) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: null
            }
        }

        try {
            let user_id
            const token = ctx.request.header.authorization
            const decodeToken = await app.jwt.verify(token, app.config.jwt.secret)
            if (!decodeToken) {
                return
            }
            user_id = decodeToken.id
            const res = await ctx.service.bill.add({
                amount,
                type_id,
                type_name,
                date,
                pay_type,
                remark,
                user_id
            })
            ctx.body = {
                code: 200,
                msg: "请求成功",
                data: null
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }
}

module.exports = BillController;