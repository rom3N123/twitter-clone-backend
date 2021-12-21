import { UserModel } from '../models/UserModel.js';

class _UserController {
    async getUser(req, res) {
        await UserModel.create({ email: 'kseexy@mail.ru', password: '120' });

        res.send('hello');
    }
}

const UserController = new _UserController();

export { UserController };
