const { isNumber } = require('../constants/regexps');

exports.id = (req, res, next, id) => {
    if (!isNumber.test(id)) {
        return res.status(400).json({ error: 'Некорректный параметр id!' });
    }
    next();
};
