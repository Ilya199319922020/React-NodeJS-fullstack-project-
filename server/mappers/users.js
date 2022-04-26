module.exports = function mapUsers(user) {
	return {
		id: user.id,
		login: user.login,
	};
};