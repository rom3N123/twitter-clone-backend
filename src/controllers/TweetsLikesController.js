import LikesService from '../services/LikesService.js';

class TweetsLikesController {
	async index(req, res, next) {
		try {
			const { userId, tweetId } = req.params;

			const likes = await LikesService.getTweetLikes(userId, tweetId);

			res.json(likes);
		} catch (error) {
			next(error);
		}
	}

	async like(req, res, next) {
		try {
			const { tweetId } = req.params;
			const { id } = req.tokenValue;

			const updatedTweet = await LikesService.likeTweet(tweetId, id);

			res.json(updatedTweet);
		} catch (error) {
			next(error);
		}
	}
}

export default new TweetsLikesController();
