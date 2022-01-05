import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import TokensService from '../services/TokensService.js';
import ApiError from '../exceptions/ApiError.js';
dotenv.config();

class AuthMiddleware {
    checkToken(req, res, next) {
        if (req.path.includes('auth')) {
            return next();
        }

        const token = TokensService.getTokenFromRequest(req);

        if (!token) {
            throw ApiError.UnauthorizedError();
        }

        try {
            jwt.verify(token, process.env.JWT_SIGNATURE);
        } catch (e) {
            throw ApiError.UnauthorizedError();
        }

        next();
    }

    decodeToken(req, res, next) {
        const token = TokensService.getTokenFromRequest(req);
        if (token) {
            req.tokenValue = jwt.verify(token, process.env.JWT_SIGNATURE);
        }
        next();
    }

    areUsersTheSame(req, res, next) {
        const { id } = req.tokenValue;
        const { userId } = req.params;

        if (id === userId) {
            next();
        } else {
            throw ApiError.BadRequestError('Users are not the same');
        }
    }
}

export default new AuthMiddleware();
