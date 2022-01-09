import TweetModel from '../models/TweetModel.js';
import RepliesService from '../services/RepliesService.js';

class RepliesController {
	async index(req, res, next) {
		try {
			const { tweetId } = req.params;

			const tweet = await TweetModel.findById(tweetId).populate({
				path: 'replies',
				populate: {
					path: 'user replyTo',
				},
			});

			res.json(tweet.replies);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { id } = req.tokenValue;
			const { tweetId } = req.params;
			const { text } = req.body;

			const reply = await RepliesService.create({ tweetId, userId: id, text });

			res.json(reply);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const { replyId } = req.params;

			await RepliesService.delete(replyId);

			res.json({ message: 'Success' });
		} catch (error) {
			next(error);
		}
	}
}

export default new RepliesController();
