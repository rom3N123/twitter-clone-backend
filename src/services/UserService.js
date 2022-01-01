import * as argon2 from 'argon2';
import { UserModel } from '../models/UserModel.js';
import { ProfileModel } from '../models/ProfileModel.js';
class _UserService {
    async create({ email, password, birthTimestamp, name }) {
        const hashedPassword = await argon2.hash(password);

        const user = await UserModel.create({
            email,
            password: hashedPassword,
        });

        const {
            _doc: { _id, userId, ...profile },
        } = await ProfileModel.create({
            name,
            birthTimestamp,
            registerTimestamp: Date.now(),
            userId: user._id,
        });

        return { id: user._id, email, ...profile };
    }
}

const UserService = new _UserService();

export { UserService };
