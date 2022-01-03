import { UserModel } from '../models/UserModel.js';
import UsersService from '../services/UsersService.js';

class UsersController {
    async getUsers(req, res) {
        const users = await UserModel.find();

        res.json({ users });
    }

    async findById(req, res) {
        const { userId } = req.params;

        try {
            const user = await UsersService.findById(userId);

            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ mesage: error.message });
        }
    }

    async update(req, res) {
        const { userId } = req.params;

        try {
            const updatedUser = await UsersService.update(userId, req.body);

            res.status(200).json(updatedUser);
        } catch (e) {
            res.status(400).json({ message: 'Update failed' });
        }
    }
}

export default new UsersController();
