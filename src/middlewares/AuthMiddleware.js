import jwt from 'jsonwebtoken';
import { signature } from '../configs/jwtConfig.js';
import AuthService from '../services/AuthService.js';

class AuthMiddleware {
    checkToken(req, res, next) {
        if (req.path.includes('auth')) {
            return next();
        }

        const token = AuthService.getTokenFromRequest(req);

        if (!token) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        try {
            req.tokenValue = jwt.verify(token, signature);
        } catch (e) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        next();
    }
}

export default new AuthMiddleware();
