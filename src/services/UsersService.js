import { UserModel } from '../models/UserModel.js';

class UsersService {
    getUserWithoutPassword(user) {
        const {
            _doc: { password, ...otherFields },
        } = user;

        return otherFields;
    }
}

export default new UsersService();
