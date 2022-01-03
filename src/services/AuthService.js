import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { UserModel } from '../models/UserModel.js';
import { signature, options } from '../configs/jwtConfig.js';
import UsersService from './UsersService.js';

class AuthService {
    async register({ email, password, birthTimestamp, name }) {
        const isUserAlreadyExist = await UserModel.findOne({ email });

        if (isUserAlreadyExist) {
            throw new Error('User with this email is exists');
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

        return { user: UsersService.getUserWithoutPassword(user), token };
    }

    async loginByCredentials({ email, password }) {
        if (!email || !password) {
            throw new Error('Incorrect email or password');
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new Error('Incorrect email or password');
        }

        const arePasswordsTheSame = await argon2.verify(
            user.password,
            password,
        );

        if (!arePasswordsTheSame) {
            throw new Error('Incorrect password or email');
        }

        return {
            user: UsersService.getUserWithoutPassword(user),
            token: this.createToken({ id: user._id }),
        };
    }

    async loginByToken(req) {
        const token = this.getTokenFromRequest(req);

        if (!token) {
            throw new Error('Incorrect token');
        }

        const tokenValue = jwt.verify(token, signature);

        if (tokenValue.id) {
            const user = await UserModel.findById(tokenValue.id);

            if (!user) {
                throw new Error('User not found');
            }

            return { user: UsersService.getUserWithoutPassword(user) };
        } else {
            throw new Error('Invalid token value');
        }
    }

    getTokenFromRequest(req) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return null;
        }

        return (
            authHeader.split(' ')[0] === 'Bearer' && authHeader.split(' ')[1]
        );
    }

    createToken(user) {
        return jwt.sign(user, signature, options);
    }
}

export default new AuthService();
