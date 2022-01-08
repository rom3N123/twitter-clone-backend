import TweetModel from '../models/TweetModel.js';

class TweetsController {
	async index(req, res, next) {
		try {
			const { userId } = req.params;

			const tweets = await TweetModel.find({ user: userId }).populate('user');

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

			await TweetModel.deleteOne({ user: userId, _id: tweetId });

			res.json({ message: 'Success' });
		} catch (error) {
			next(error);
		}
	}
}

export default new TweetsController();
