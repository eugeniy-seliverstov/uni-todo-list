const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { port, devmode, session, cors: { origin } } = require('./config');

const api = require('./routes/api');

const errorHandler = require('./core/errorHandler');

const app = express();

app.set('views', path.resolve(__dirname, './views'));
app.set('env', devmode ? 'development' : 'production');

app.use(helmet());
app.use(cors({ origin, credentials: true }));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(session.secret));
app.use(expressSession(session));

app.use('/api', api);
app.use(errorHandler);

app.listen(port, console.log(`Server has been started on port ${port}!`));

module.exports = app;
