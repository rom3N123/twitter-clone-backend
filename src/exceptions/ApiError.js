class ApiError extends Error {
	status;
	message;
	errors;

	constructor(status, message, errors = []) {
		super(message);
		this.message = message;
		this.status = status;
		this.errors = errors;
	}

	static UnauthorizedError() {
		return new ApiError(401, 'unauthorized');
	}

	static BadRequestError(message = 'bad request') {
		return new ApiError(400, message);
	}

	static NotFoundError(name) {
		return new ApiError(404, [name || 'Entity', 'not found'].join(' '));
	}
}

export default ApiError;
