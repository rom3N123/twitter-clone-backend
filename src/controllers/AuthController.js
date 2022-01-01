import AuthService from '../services/AuthService.js';

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
}

export default new AuthController();
