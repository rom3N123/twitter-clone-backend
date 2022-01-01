import jwt from 'jsonwebtoken';
import { signature } from '../jwtConfig.js';

class _AuthMiddleware {
    checkToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token =
                authHeader.split(' ')[0] === 'Bearer' &&
                authHeader.split(' ')[1];

            if (!token) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            try {
                req.tokenValue = jwt.verify(token, signature);
            } catch (e) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    }
}

export default new _AuthMiddleware();
