import TweetModel from '../models/TweetModel.js';
import TweetsService from './TweetsService.js';

class RepliesService {
	async create({ tweetId, userId, text }) {
		const reply = await TweetsService.createTweet({
			text,
			replyTo: tweetId,
			user: userId,
		});

		await TweetModel.findByIdAndUpdate(tweetId, {
			$push: {
				replies: reply.id,
			},
		});

		return reply;
	}

	async delete(replyId) {
		const reply = await TweetModel.findById(replyId);

		await TweetModel.findByIdAndUpdate(reply.replyTo, {
			$pull: {
				replies: reply._id,
			},
		});

		await reply.remove();
	}
}

export default new RepliesService();
