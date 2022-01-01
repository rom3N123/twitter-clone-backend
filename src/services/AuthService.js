import * as argon2 from 'argon2';
import { UserModel } from '../models/UserModel.js';
import { UserService } from '../services/UserService.js';

class _AuthService {
    /**
     * @param {string} email Почта
     * @param {string} password Пароль
     * @param {number} birthTimestamp Таймстамп рождения
     * @param {string} name Имя
     * @returns {Model} Модель пользователя
     */
    async register({ email, password, birthTimestamp, name }) {
        const isUserAlreadyExist = await UserService.findUserByEmail(email);

        if (isUserAlreadyExist) {
            throw new Error('User already exists');
        }

        const hashedPassword = await argon2.hash(password);

        const registeredTimestamp = Date.now();

        await UserModel.create({
            email,
            password: hashedPassword,
            birthTimestamp,
            name,
            registeredAt: registeredTimestamp,
        });

        return {
            email,
            password,
            name,
            birthTimestamp,
            createdAt: registeredTimestamp,
        };
    }
}

const AuthService = new _AuthService();

export { AuthService };
