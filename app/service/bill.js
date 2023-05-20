'use strict';

const Service = require('egg').Service

class BillService extends Service {
    async add(params) {
        const { ctx, app } = this;
        try {
            const res = await app.mysql.insert('bill', params)
            return res
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async list(id) {
        const { ctx, app } = this;
        const QUERY_STR = 'id, pay_type, amount, date, type_id, type_name, remark'
        let sql = `select ${QUERY_STR} from bill where user_id = ${id}`
        try {
            const res = await app.mysql.query(sql)
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async detail(id, user_id) {
        const { ctx, app } = this;
        try {
            const res = await app.mysql.get('bill', { id, user_id })
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async update(params) {
        const { ctx, app } = this;
        try {
            let res = await app.mysql.update('bill', {
                ...params
            }, {
                id: params.id,
                user_id: params.user_id
            })
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async delete(id, user_id) {
        const { ctx, app } = this;
        try {
            const res = app.mysql.delete('bill', {
                id: id,
                user_id: user_id
            })
            return res
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

module.exports = BillService;