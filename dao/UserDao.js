const db = require('../core/db');

class UserDao {

    async getById(id) {
        const [[user]] = await db.query('SELECT id, login, password FROM user WHERE id = ?', [id]);
        return user;
    }

    async getByLogin(login) {
        const [[user]] = await db.query('SELECT id, login, password FROM user WHERE login = ?', [login]);
        return user;
    }

    async insert(login, passwordHash) {
        const [result] = await db.query('INSERT INTO user (login, password) values (?, ?)', [login, passwordHash]);
        return result;
    }
}

module.exports = new UserDao();
