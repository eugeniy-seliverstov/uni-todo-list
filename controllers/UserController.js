class UserController {

    isAuthorized(req, res) {
        const authorized = req.session.userId ? true : false;
        res.json({ authorized });
    }

}

module.exports = new UserController();
