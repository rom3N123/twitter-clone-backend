import AuthService from '../services/AuthService.js';
import { getIsRequestBodyEmpty } from '../helpers/customFunctions.js';
import TokensService from '../services/TokensService.js';

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password, birthTimestamp, name } = req.body;

            const { user, access, refresh } = await AuthService.register({
                email,
                password,
                birthTimestamp,
                name,
            });

            res.cookie('refreshToken', refresh, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.json({ user, token: access });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const isBodyEmpty = getIsRequestBodyEmpty(req.body);

            const { user, access, refresh } = isBodyEmpty
                ? await AuthService.loginByToken(req)
                : await AuthService.loginByCredentials(req.body);

            if (refresh) {
                res.cookie('refreshToken', refresh, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
            }

            res.json({ user, token: access });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            const { access, refresh } = await TokensService.refreshTokens(
                refreshToken,
            );

            res.cookie('refreshToken', refresh, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            res.json({ token: access });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { id } = req.tokenValue;

            console.log(id);

            await TokensService.deleteRefreshToken(id);

            res.status(200).json({ message: 'Success' });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
