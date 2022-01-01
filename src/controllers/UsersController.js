import { UserModel } from '../models/UserModel.js';

class UsersController {
    async getUsers(req, res) {
        const users = await UserModel.find();

        res.json({ users });
    }
}

export default new UsersController();
