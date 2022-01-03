import { UserModel } from '../models/UserModel.js';

class UsersService {
    getUserWithoutPassword(user) {
        const {
            _doc: { password, ...otherFields },
        } = user;

        return otherFields;
    }

    async findById(userId) {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return this.getUserWithoutPassword(user);
    }

    async update(userId, fields) {
        try {
            const user = await UserModel.findByIdAndUpdate(userId, fields, {
                new: true,
            });

            return this.getUserWithoutPassword(user);
        } catch (e) {
            throw Error('User not found');
        }
    }
}

export default new UsersService();
