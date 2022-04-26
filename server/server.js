const express = require('express');
const app = express();
const router = require('./routes/index');
require('dotenv').config();
const createAuth = require('./libs/passportLocal');
const cors = require('cors');

const port = process.env.PORT || 8080;
const host = '127.0.0.1';

app.listen(port, host, () => {
	console.log(`Express запущен на http://${host}:${port};`)
});

app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
	secret: 'SECRET',
	resave: false,
	saveUninitialized: true
}));
app.use(require('cookie-parser')())
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/api', function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  Set-Cookie',);
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});


const auth = createAuth(app);
auth.init();
auth.login();

app.use('/api', router);

// Пользовательская страница 404
app.use(function (req, res, next) {
	res.status(404).send('Sorry !');
	next()
});
// Пользовательская страница 500
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

module.exports = app;


