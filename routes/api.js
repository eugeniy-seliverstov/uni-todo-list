const express = require('express');

const TaskController = require('../controllers/TaskController');
const AuthController = require('../controllers/AuthController');

const isAuth = require('../middlewares/is-auth');
const getUser = require('../middlewares/get-user');

const router = express.Router();
const authRouter = express.Router();

router.post('/register', AuthController.register);
router.post('/auth', AuthController.auth);
router.post('/logout', AuthController.logout);

router.use(authRouter);

authRouter.use(isAuth);
authRouter.use(getUser);

authRouter.get('/tasks', TaskController.get);
authRouter.post('/tasks', TaskController.create);
authRouter.put('/tasks/:id', TaskController.update);
authRouter.delete('/tasks/:id', TaskController.remove);

module.exports = router;
