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
    async findOneUser(id) {
        const { ctx, app } = this
        const QUERY_STR = 'id, name'
        let sql = `select ${QUERY_STR} from egg_testdata where id=${id}`
        try {
            const res = await app.mysql.query(sql)
            return res
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async add_user(id, name) {
        const { ctx, app } = this
        try {
            const hasUser = await this.findOneUser(id)
            if (hasUser.length == 0) {
                const res = await app.mysql.insert('egg_testdata', { name })
                return res
            } else {
                console.log('已经存在该用户！')
                return null
            } 
        } catch (error) {
            console.log(error);
            return null
        }
    }
    async updateUser(id, name) {
        const { ctx, app } = this
        try {
            const res = await app.mysql.update('egg_testdata', {name}, {where: id})
            return res
        } catch (error) {
            console.log(error);
            return null
        }
    }
}

module.exports = HomeService;