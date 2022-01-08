import ApiError from '../exceptions/ApiError.js';
import TweetModel from '../models/TweetModel.js';
import UserModel from '../models/UserModel.js';

class HomeService {
	async getFollowingTweets(userId) {
		const user = await UserModel.findById(userId);

		console.log(user);

		if (!user) {
			throw ApiError.NotFoundError('User');
		}

		const tweets = await TweetModel.find({
			user: {
				$in: user.following,
			},
		}).populate('user');

		return tweets;
	}
}

export default new HomeService();
