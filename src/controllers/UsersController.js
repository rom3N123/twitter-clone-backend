import { UserModel } from '../models/UserModel.js';
import UsersService from '../services/UsersService.js';

class UsersController {
    async getUsers(req, res) {
        const users = await UserModel.find();

        res.json({ users });
    }

    async findById(req, res) {
        const { userId } = req.params;

        const user = await UserModel.findById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(UsersService.getUserWithoutPassword(user));
        }
    }
}

export default new UsersController();
