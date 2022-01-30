import UserModel from '../models/UserModel.js';

class FollowingController {
	async index(req, res, next) {
		try {
			const { userId } = req.params;

			const user = await UserModel.findById(userId);

			const following = await UserModel.find({
				_id: {
					$in: user.following,
				},
			});

			res.json(following);
		} catch (error) {
			next(error);
		}
	}
}

export default new FollowingController();
