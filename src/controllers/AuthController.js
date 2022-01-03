import AuthService from '../services/AuthService.js';
import { getIsRequestBodyEmpty } from '../helpers/customFunctions.js';

class AuthController {
    async register(req, res) {
        try {
            const { email, password, birthTimestamp, name } = req.body;

            const createdUser = await AuthService.register({
                email,
                password,
                birthTimestamp,
                name,
            });

            res.json(createdUser);
        } catch (error) {
            res.status(400).json({ status: 'fail', error: error.message });
        }
    }

    async login(req, res) {
        try {
            const isBodyEmpty = getIsRequestBodyEmpty(req.body);

            const { user, token } = isBodyEmpty
                ? await AuthService.loginByToken(req)
                : await AuthService.loginByCredentials(req.body);

            res.json({ user, token });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }

    async logout(req, res) {}
}

export default new AuthController();
