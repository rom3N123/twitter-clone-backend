import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { UserModel } from '../models/UserModel.js';
import { signature, options } from '../jwtConfig.js';
class AuthService {
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

        const token = this.createToken({
            id: user._id,
        });

        return { user, token };
    }

    async login(req, res) {}

    createToken(user) {
        return jwt.sign(user, signature, options);
    }
}

export default new AuthService();
