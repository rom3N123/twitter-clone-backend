import mongoose from 'mongoose';
import ApiError from '../exceptions/ApiError.js';
import UserModel from '../models/UserModel.js';
import UsersService from '../services/UsersService.js';

class UsersController {
	async get(req, res, next) {
		const { userId } = req.params;

		if (!mongoose.isValidObjectId(userId)) {
			throw ApiError.BadRequestError('Incorrect user id');
		}

		try {
			const user = await UsersService.findById(userId);

			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		const { userId } = req.params;

		try {
			const updatedUser = await UsersService.update(userId, req.body);

			res.status(200).json(updatedUser);
		} catch (error) {
			next(error);
		}
	}

	async search(req, res, next) {
		try {
			const { needle } = req.query;

			const users = await UserModel.find({
				$text: {
					$search: needle,
				},
			});

			res.json(users);
		} catch (error) {
			next(error);
		}
	}
}

export default new UsersController();
