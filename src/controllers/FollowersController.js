import UserModel from '../models/UserModel.js';
import FollowersService from '../services/FollowersService.js';

class FollowersController {
	async index(req, res, next) {
		try {
			const { userId } = req.params;

			const user = await UserModel.findById(userId);

			const followers = await UserModel.find({
				_id: {
					$in: user.followers,
				},
			});

			res.json(followers);
		} catch (error) {
			next(error);
		}
	}

	async follow(req, res, next) {
		try {
			const { userId } = req.params;
			const { id } = req.tokenValue;

			const updatedUser = await FollowersService.follow(userId, id);

			res.json(updatedUser);
		} catch (error) {
			next(error);
		}
	}

	async unfollow(req, res, next) {
		try {
			const { userId } = req.params;
			const { id } = req.tokenValue;

			const updatedUser = await FollowersService.unfollow(userId, id);

			res.json(updatedUser);
		} catch (error) {
			next(error);
		}
	}
}

export default new FollowersController();
