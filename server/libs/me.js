module.exports.me = async function (req, res,  next) {
	res.body = {
	  login: res.user.login,
	  id: res.user.id,
	};
 };