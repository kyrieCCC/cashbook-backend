'use strict'

const Service = require('egg').Service;

class HomeService extends Service {
    async user() {
        const { ctx, app } = this
        const QUERY_STR = 'id, name'
        let sql = `select ${QUERY_STR} from egg_testdata`
        try {
            const res = await app.mysql.query(sql)
            return res
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

module.exports = HomeService;