import TweetModel from '../models/TweetModel.js';

class TweetsService {
	async createTweet(tweet) {
		const createdTweet = await TweetModel.create({
			...tweet,
			publishTimestamp: Date.now(),
		});

		return createdTweet;
	}
}

export default new TweetsService();
