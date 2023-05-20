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
}

module.exports = BillService;