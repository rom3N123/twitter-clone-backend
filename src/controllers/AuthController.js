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
            res.json({ status: 'fail', error: error.message });
        }
    }

    async login(req, res) {
        try {
            const credentials = req.body;

            const isCredentialsEmpty = getIsRequestBodyEmpty(credentials);

            const { user, token } = isCredentialsEmpty
                ? await AuthService.loginByToken(req)
                : await AuthService.loginByCredentials(credentials);

            res.json({ user, token });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
}

export default new AuthController();
