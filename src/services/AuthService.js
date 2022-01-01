import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { UserModel } from '../models/UserModel.js';

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

        const hashedPassword = await argon2.hash(password);

        const user = await UserModel.create({
            email,
            password: hashedPassword,
            birthTimestamp,
            name,
            registerTimestamp: Date.now(),
        });

        const token = this.createToken(user._doc);

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
