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
}

module.exports = BillService;