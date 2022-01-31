import { validationResult } from 'express-validator';

class _BodyValidationMiddleware {
	validate(req, res, next) {
		const { errors } = validationResult(req);

		if (errors.length) {
			return res
				.status(400)
				.json({ status: 'fail', message: 'Validation error', errors });
		}

		next();
	}
}

const BodyValidationMiddleware = new _BodyValidationMiddleware();

export { BodyValidationMiddleware };
