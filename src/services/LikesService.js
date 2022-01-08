import ApiError from '../exceptions/ApiError.js';
import TweetModel from '../models/TweetModel.js';

class LikesService {
	async getTweetLikes(userId, tweetId) {
		const tweet = await TweetModel.findOne({
			_id: tweetId,
			user: userId,
		}).populate('likes');

		return tweet.likes;
	}

	async likeTweet(tweetId, likeAuthorId) {
		const tweet = await TweetModel.findById(tweetId);

		if (!tweet) {
			throw ApiError.NotFoundError('Tweet');
		}

		if (tweet.likes.includes(likeAuthorId)) {
			tweet.likes = tweet.likes.filter(
				userId => userId.toString() !== likeAuthorId
			);
			const updatedTweet = await tweet.save();
			return updatedTweet;
		}

		const updatedTweet = await TweetModel.findByIdAndUpdate(
			tweetId,
			{
				$push: {
					likes: likeAuthorId,
				},
			},
			{
				new: true,
			}
		);

		return updatedTweet;
	}
}

export default new LikesService();
