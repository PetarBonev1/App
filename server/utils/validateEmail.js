const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/);
};

module.exports = {
	validateEmail,
};
