const db = require('../core/db');

class TaskDao {
    async getByUserId(userId) {
        try {
            const [tasks] = await db.query('SELECT * FROM task WHERE user_id = ?', [userId]);
            return tasks;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async insert(text, userId) {
        try {
            const [result] = await db.query('INSERT INTO task (text, user_id) values (?, ?)', [text, userId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(text, isDone, id, userId) {
        try {
            const [result] = await db.query('UPDATE task SET text = ?, is_done = ? WHERE id = ? AND user_id = ?', [text, isDone, id, userId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(id, userId) {
        try {
            const [result] = await db.query('DELETE FROM task WHERE id = ? AND user_id = ?', [id, userId]);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new TaskDao();
