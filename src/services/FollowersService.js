import ApiError from '../exceptions/ApiError.js';
import UserModel from '../models/UserModel.js';

class FollowersService {
	async follow(userId, followerId) {
		const user = await UserModel.findById(userId);

		if (user.followers.includes(followerId)) {
			throw ApiError.BadRequestError('You already following this user');
		}

		user.followers.push(followerId);
		user.save();

		const updatedUser = await UserModel.findByIdAndUpdate(
			followerId,
			{
				$push: {
					following: userId,
				},
			},
			{
				new: true,
			}
		);

		return updatedUser;
	}

	async unfollow(userId, followerId) {
		await UserModel.findByIdAndUpdate(userId, {
			$pull: {
				followers: followerId,
			},
		});

		const updatedUser = await UserModel.findByIdAndUpdate(
			followerId,
			{
				$pull: {
					following: userId,
				},
			},
			{
				new: true,
			}
		);

		return updatedUser;
	}
}

export default new FollowersService();
