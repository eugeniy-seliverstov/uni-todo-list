const UserDao = require('../dao/UserDao');

module.exports = async (req, res, next) => {
    const { userId } = req.session;

    if (!userId) {
        return res.status(401).json({ error: 'Not authorized!' });
    }
    
    try {
        req.user = await UserDao.getById(userId);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unexpected error!' });
    }
}

