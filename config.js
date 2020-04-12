module.exports = {
    port: 8333,
    devmode: true,
    cors: {
        origin: ['http://localhost:8080']
    },
    database: {
        host: 'localhost',
        user: 'root',
        database: 'todo-app',
        password: '',
        waitForConnections: true,
        connectionLimit: 100,
    },
    session: {
        resave: false,
		saveUninitialized: false,
		secret: 'H2;G2f30[{}]X77[!R}93',
		name: 'session',
		cookie: {
            httpOnly: true,
			secure: false, // HTTPS
			maxAge: 1000 * 60 * 60 * 6
		}
    }
};
