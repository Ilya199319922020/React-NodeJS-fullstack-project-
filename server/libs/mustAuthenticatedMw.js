module.exports = function mustAuthenticatedMw(req, res, next) {
	req.session.user !== undefined
		? next()
		: res.redirect('/api/login');
};