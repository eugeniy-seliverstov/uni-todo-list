const db = require('../core/db');

class TaskDao {
    async getByUserId(userId) {
        const [tasks] = await db.query('SELECT * FROM task WHERE user_id = ?', [userId]);
        return tasks;
    }

    async insert(text, userId) {
        const [result] = await db.query('INSERT INTO task (text, user_id) values (?, ?)', [text, userId]);
        return result;
    }

    async update(text, isDone, id, userId) {
        const [result] = await db.query('UPDATE task SET text = ?, is_done = ? WHERE id = ? AND user_id = ?', [text, isDone, id, userId]);
        return result;
    }

    async delete(id, userId) {
        const [result] = await db.query('DELETE FROM task WHERE id = ? AND user_id = ?', [id, userId]);
        return result;
    }
}

module.exports = new TaskDao();
