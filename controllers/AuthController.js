const bcrypt = require('bcrypt');
const UserDao = require('../dao/UserDao');
const { isLogin, isPassword } = require('../constants/regexps'); 

class AuthController {

    async register(req, res) {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({ error: 'Недостаточно параметров!' });
        }

        if (!isLogin.test(login)) {
            return res.status(400).json({ error: 'Некорректный логин!' });
        }

        if (!isPassword.test(password)) {
            return res.status(400).json({ error: 'Некорректный пароль!' });
        }

        try {
            const user = await UserDao.getByLogin(login);
        
            if (user) {
                return res.status(400).json({ error: 'Данный логин уже занят' });
            }

            const hash = bcrypt.hashSync(password, 10);
            const result = await UserDao.insert(login, hash);

            if (!result.affectedRows) {
                return res.status(400).json({ error: 'Ошибка регистрации, проверьте правильность введенных данных и повторите попытку!' });
            }
            
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
        }
    }

    async auth(req, res) {
        const { login, password } = req.body;

        if (req.session.userId) {
            return res.status(403).json({ error: 'Уже авторизован!' });
        }

        if (!login || !password) {
            return res.status(400).json({ error: 'Недостаточно параметров!' });
        }

        try {
            const user = await UserDao.getByLogin(login);
        
            if (!user) {
                return res.status(400).json({ error: 'Пользователь не найден!' });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({ error: 'Неверный пароль. Попробуйте снова!' });
            }
            
            req.session.userId = user.id;
            
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
        }
    }

    async logout(req, res) {
        try {
            req.session.destroy();
            return res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Неожиданная ошибка, попробуйте ещё раз...' });
        }
    }

}

module.exports = new AuthController();
