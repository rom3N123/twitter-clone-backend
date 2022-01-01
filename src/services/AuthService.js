import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js';
import { UserService } from '../services/UserService.js';

class _AuthService {
    /**
     * Создаёт пользователя в БД
     * @param {string} email Почта
     * @param {string} password Пароль
     * @param {number} birthTimestamp Таймстамп рождения
     * @param {string} name Имя
     * @returns {Model} Модель пользователя
     */
    async register({ email, password, birthTimestamp, name }) {
        const isUserAlreadyExist = await UserModel.findOne({ email });

        if (isUserAlreadyExist) {
            throw new Error('User already exists');
        }

        const user = await UserService.create({
            email,
            password,
            birthTimestamp,
            name,
        });

        const token = this.createToken(user);

        return { user, token };
    }

    createToken(user) {
        const signature = 'MySuP3R_z3kr3t';
        const options = { expiresIn: '24h' };

        return jwt.sign(user, signature, options);
    }
}

const AuthService = new _AuthService();

export { AuthService };
