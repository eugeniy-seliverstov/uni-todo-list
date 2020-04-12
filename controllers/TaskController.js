const TaskDao = require('../dao/TaskDao');

class TaskController {

    async get(req, res) {
        try {
            const tasks = await TaskDao.getByUserId(req.session.userId);
            res.json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
        }
    }

    async create(req, res) {
        if (!req.body.text) {
            return res.status(400).json({ error: 'Недостаточно параметров!' });
        }

        try {
            const { affectedRows, insertId } = await TaskDao.insert(req.body.text, req.session.userId);
            if (!affectedRows) {
                return res.status(400).json({ error: 'Задача не создана!' });
            }
            res.json({ success: true, id: insertId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
        }  
    }

    async update(req, res) {
        const { body: { text, isDone }, params: { id }, user } = req;
        if (!text || isDone === undefined || !id) {
            return res.status(400).json({ error: 'Недостаточно параметров!' });
        }
        
        try {
            const result = await TaskDao.update(text, isDone, id, user.id);
            if (!result.affectedRows) {
                return res.status(400).json({ error: 'Задача не обновлена!' });
            }
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
        }  
    }

    async remove(req, res) {
        try {
            const result = await TaskDao.delete(req.params.id, req.session.userId);
            if (!result.affectedRows) {
                return res.status(400).json({ error: 'Задача не найдена!' });
            }
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
        }
    }

}

module.exports = new TaskController();
