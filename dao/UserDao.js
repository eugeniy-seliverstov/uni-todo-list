const db = require('../core/db');

class UserDao {

    async getById(id) {
        try {
            const [[user]] = await db.query('SELECT id, login, password FROM user WHERE id = ?', [id]);
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getByLogin(login) {
        try {
            const [[user]] = await db.query('SELECT id, login, password FROM user WHERE login = ?', [login]);
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async insert(login, passwordHash) {
        try {
            const [result] = await db.query('INSERT INTO user (login, password) values (?, ?)', [login, passwordHash]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new UserDao();
