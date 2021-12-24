import { validationResult } from 'express-validator';

class _BodyValidationMiddleware {
    validate(req, res, next) {
        const { errors } = validationResult(req);

        if (errors.length) {
            return res.json({ errors });
        }

        next();
    }
}

const BodyValidationMiddleware = new _BodyValidationMiddleware();

export { BodyValidationMiddleware };
