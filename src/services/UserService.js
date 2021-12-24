import { UserModel } from '../models/UserModel.js';

class _UserService {
    /**
     * @param {string} email
     * @returns {null|Model} Модель пользователя
     */
    async findUserByEmail(email) {
        return UserModel.findOne({ email });
    }
}

const UserService = new _UserService();

export { UserService };
