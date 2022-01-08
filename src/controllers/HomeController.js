import HomeService from '../services/HomeService.js';

class HomeController {
	async index(req, res, next) {
		try {
			const { id } = req.tokenValue;

			const followingTweets = await HomeService.getFollowingTweets(id);

			res.json(followingTweets);
		} catch (error) {
			next(error);
		}
	}
}

export default new HomeController();
