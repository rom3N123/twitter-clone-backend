import { UserModel } from '../models/UserModel.js';

class UserController {
    async getUser(req, res) {
        await UserModel.create({ email: 'kseexy@mail.ru', password: '120' });

        res.send('hello');
    }
}

export default new UserController();
