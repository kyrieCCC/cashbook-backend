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
            const formatDate = moment(Number())
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

    async list() {
        const { ctx, app } = this;
        const { date, page = 1, page_size = 5, type_id = 'all' } = ctx.query
        
        try {
            let user_id
            const token = ctx.request.header.authorization
            const decodeToken = app.jwt.verify(token, app.config.jwt.secret)
            if (!decodeToken) {
                return 
            }

            user_id = decodeToken.id
            const list = await ctx.service.bill.list(user_id)
            console.log(list)
            const _list = list.filter(item => {
                if (type_id != 'all') {
                    return moment(Number(item.date)).format('YYYY-MM') == date && type_id == item.type_id
                }
                console.log(moment(Number(item.date)).format('YYYY-MM'))
                return moment(Number(item.date)).format('YYYY-MM') == date
            })
            // 格式化数据
            let listMap = _list.reduce((cur, item) => {
                // cur默认是一个空数组
                // 把第一个账单项的时间格式化为yyyy-mm-dd
                const date = moment(Number(item.date)).format('YYYY-MM-DD')
                // 如果在累加的数组当中找到当前项日期date，那么在数组中加入当前项到bill
                if (cur && cur.length && cur.findIndex(item => item.date == date) > -1) {
                    const index = cur.findIndex(item => item.date == date)
                    cur[index].bills.push(item)
                }
                // 如果在累加的数组中找不到当前项日期的，那么再新建一项
                if (cur && cur.length && cur.findIndex(item => item.date == date) == -1) {
                    cur.push({
                        date,
                        bills: [item]
                    })
                }
                if (!cur.length) {
                    cur.push({
                        date, 
                        bills: [item]
                    })
                }
                return cur
            }, []).sort((a, b) => moment(b.date) - moment(a.date)) // 倒序输出
            const filterListMap = listMap.slice((page - 1) * page_size, page_size * page)


            // 计算当月的总收入和支出
            // 首先获取当月的账单列表
            let __list = list.filter(item => moment(Number(item.date)).format('YYYY-MM') == date)
            // 计算累加支出
            let totalExpense = __list.reduce((cur, item) => {
                if (item.pay_type == 1) {
                    cur += Number(item.amount)
                    return cur
                }
                return cur
            }, 0)
            // 计算累计收入
            let totalIncome = __list.reduce((cur, item) => {
                if (item.pay_type == 2) {
                    cur += Number(item.amount)
                    return cur
                }
                return cur
            }, 0)

            ctx.body = {
                code: 200,
                msg: 'success',
                data: {
                    totalExpense,
                    totalIncome,
                    totalPage: Math.ceil(listMap.length / page_size), // 总分页
                    list: filterListMap || []
                }
            }
        } catch {
            ctx.body = {
                code: 500,
                msg: 'fail',
                data: null
            }
        }
    }

    async detail() {
        const { ctx, app } = this;
        const { id = '' } = ctx.query;
        let user_id
        const token = ctx.request.header.authorization
        const decodeToken = await app.jwt.verify(token, app.config.jwt.secret)
        if (!decodeToken) {
            return 
        }
        user_id = decodeToken.id
        if (!id) {
            ctx.body = {
                code: 500,
                msg: "订单id不能为空",
                data: null
            }
            return 
        }

        try {
            const detail = await ctx.service.bill.detail(id, user_id)
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: detail
            }
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }

    async update() {
        const { ctx, app } = this;
        const { id, amount, type_id, type_name, date, pay_type, remark = '' } = ctx.request.body
        if (!amount || !type_id || !type_name || !date || !pay_type) {
            ctx.body = {
                code: 400,
                msg: '参数错误',
                data: null
            }
        }

        try {
            let user_id
            const token = ctx.request.header.authorization;
            const decode = await app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) return
            user_id = decode.id
            // 根据账单 id 和 user_id，修改账单数据
            const result = await ctx.service.bill.update({
                id, // 账单 id
                amount, // 金额
                type_id, // 消费类型 id
                type_name, // 消费类型名称
                date, // 日期
                pay_type, // 消费类型
                remark, // 备注
                user_id // 用户 id
            });
            ctx.body = {
                code: 200,
                msg: '请求成功',
                data: null
            }
        } catch (error) {
            console.log(error)
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }

    async delete() {
        const { ctx, app } = this;
        const { id } = ctx.request.body;

        try {
            let user_id
            const token = ctx.request.header.authorization;
            const decode = await app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) return
            user_id = decode.id
            const res = ctx.service.bill.delete(id, user_id)
            ctx.body = {
                code: 200,
                msg: '信息删除成功',
                data: null
            }
        }catch (error) {
            console.log(error)
            ctx.body = {
                code: 500,
                msg: '系统错误',
                data: null
            }
        }
    }

    async data() {
        const { ctx, app } = this;
        const { date = '' } = ctx.query
        
        let user_id
            const token = ctx.request.header.authorization;
            const decode = await app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) return
            user_id = decode.id
        try {
            const res = await ctx.service.bill.list(user_id)
            const start = moment(date).startOf('month').unix() * 1000
            const end = moment(date).endOf('month').unix() * 1000
            const _data = res.filter(item => (Number(item.date) > start) && (Number(item.date) < end))
            
            // 计算总支出
            const total_expense = _data.reduce((arr, cur) => {
                if (cur.pay_type == 1) {
                    arr += Number(cur.amount)
                }
                return arr
            }, 0)

            // 计算总收入
            const total_income = _data.reduce((arr, cur) => {
                if (cur.pay_type == 2) {
                    arr += Number(cur.amount)
                }
                return arr
            }, 0)

            // 计算收支构成
            let total_data = _data.reduce((arr, cur) => {
                const index = arr.findIndex(item => item.type_id == cur.type_id)
                // 查看现在是否在arr中存在相同类型的收支
                // 如果不存在，就新增一个新的记录
                // 如果存在相同类型的收支，就将number也就是金额进行累加
                if (index == -1) {
                    arr.push({
                        type_id: cur.type_id,
                        type_name: cur.type_name,
                        pay_type: cur.pay_type,
                        number: Number(cur.amount)
                    })
                }
                if (index > -1) {
                    arr[index].number += Number(cur.amount)
                }
                return arr
            }, [])

            // 保留两位小数
            total_data = total_data.map(item => {
                item.number = Number(Number(item.number).toFixed(2))
                return item
            })

            ctx.body = {
                code: 200,
                msg: '请求成功了',
                data: {
                    total_expense: Number(total_expense).toFixed(2),
                    total_income: Number(total_income).toFixed(2),
                    total_data: total_data || []
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = BillController;