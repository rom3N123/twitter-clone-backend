import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import UserModel from '../models/UserModel.js';
import TokensService from './TokensService.js';
import dotenv from 'dotenv';
import ApiError from '../exceptions/ApiError.js';
dotenv.config();

class AuthService {
	async register({ email, password, birthTimestamp, name }) {
		const isUserAlreadyExist = await UserModel.findOne({ email });

		if (isUserAlreadyExist) {
			throw ApiError.BadRequestError('User with this email is already exist');
		}

		const hashedPassword = await argon2.hash(password);

		const {
			_doc: { password: userPassword, ...otherUserFields },
		} = await UserModel.create({
			email,
			password: hashedPassword,
			birthTimestamp,
			name,
			registerTimestamp: Date.now(),
		});

		return {
			user: otherUserFields,
			...(await TokensService.createPairOfTokens(otherUserFields._id)),
		};
	}

	async loginByCredentials({ email, password }) {
		if (!email || !password) {
			throw ApiError.BadRequestError('Incorrect email or password');
		}

		const user = await UserModel.findOne({ email }).select('+password').lean();

		if (!user) {
			throw ApiError.BadRequestError('Incorrect email or password');
		}

		const { password: userPassword, ...otherUserFields } = user;

		const arePasswordsTheSame = await argon2.verify(userPassword, password);

		if (!arePasswordsTheSame) {
			throw ApiError.BadRequestError('Incorrect password or email');
		}

		return {
			user: otherUserFields,
			...(await TokensService.createPairOfTokens(otherUserFields._id)),
		};
	}

	async loginByToken(req) {
		const token = TokensService.getTokenFromRequest(req);

		if (!token) {
			throw ApiError.UnauthorizedError();
		}

		try {
			const tokenValue = jwt.verify(token, process.env.JWT_SIGNATURE);

			if (tokenValue.id) {
				const user = await UserModel.findById(tokenValue.id);

				if (!user) {
					throw ApiError.UnauthorizedError();
				}

				return { user };
			} else {
				throw ApiError.UnauthorizedError();
			}
		} catch (_) {
			throw ApiError.UnauthorizedError();
		}
	}
}

export default new AuthService();
