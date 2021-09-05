function ErrHandler(err, error) {
	Object.values(err.errors).map(({properties}) => {
		error[properties.path] = properties.message
	})

	return error;
}

module.exports = ErrHandler;