import TweetModel from '../models/TweetModel.js';
import RepliesService from '../services/RepliesService.js';

class TweetsController {
	async index(req, res, next) {
		try {
			const { userId } = req.params;

			const tweets = await TweetModel.find({
				user: userId,
			})
				.where({
					replyTo: undefined,
				})
				.populate('user');

			res.json(tweets);
		} catch (error) {
			next(error);
		}
	}

	async get(req, res, next) {
		try {
			const { userId, tweetId } = req.params;

			const tweet = await TweetModel.findOne({
				_id: tweetId,
				userId,
			})
				.populate('user')
				.populate({
					path: 'replyTo',
					populate: {
						path: 'user',
					},
				});

			res.json(tweet);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { userId } = req.params;
			const { text } = req.body;

			const tweet = await TweetModel.create({
				text,
				publishTimestamp: Date.now(),
				user: userId,
			});

			res.json(tweet);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const { userId, tweetId } = req.params;

			await RepliesService.remove({ userId, tweetId });

			res.json({ message: 'Success' });
		} catch (error) {
			next(error);
		}
	}
}

export default new TweetsController();
