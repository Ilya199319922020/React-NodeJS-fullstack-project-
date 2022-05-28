const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const Session = require('../models/Session');
const mongoose = require('mongoose');
const passport = require('passport');
const { v4: uuid } = require('uuid');

module.exports = function (app) {
	return {
		init: function () {
			passport.use(new LocalStrategy(
				{ usernameField: 'login', passwordField: 'password', session: false },
				async function (login, password, done) {
					try {
						const user = await User.findOne({ login: login });
						if (!user) {
							return done(null, false, 'Нет такого пользователя');
						}
						const isValidPassword = await user.checkPassword(password);

						if (!isValidPassword) {
							return done(null, false, 'Неверный пароль');
						}

						return done(null, user);
					} catch (err) {
						done(err);
					}
				},

			)
			);
		},

		login: function () {
			app.post('/api/login', async function (req, res, next) {

				await passport.authenticate('local', async (err, user, info) => {
					if (err) throw err;

					if (!user) {
						return res.redirect('/api/login');
					}

					const token = uuid();
					await Session.create({ token, user, lastVisit: new Date() });

					req.login(
						user, { session: false },
						async (error) => {
							if (error) return next(error);
							return res.send({ id: user.id, login: user.login, token });
						}
					);
				})(req, res, next);
			})
		},
	};
};


