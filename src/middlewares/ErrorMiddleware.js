import ApiError from '../exceptions/ApiError.js';

export default function (error, req, res, next) {
	if (error instanceof ApiError) {
		return res
			.status(error.status)
			.json({ message: error.message, errors: error.errors });
	}

	return res.status(500).json({ message: error.message });
}
