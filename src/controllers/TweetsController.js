import mongoose from 'mongoose'
import TweetModel from '../models/TweetModel.js'
import UserModel from '../models/UserModel.js'
import UsersService from '../services/UsersService.js'

class TweetsController {
	async index(req, res, next) {
		try {
			const { userId } = req.params

			const tweets = await TweetModel.aggregate([
				{
					$match: {
						userId: mongoose.Types.ObjectId(userId),
					},
				},
				{
					$lookup: {
						from: 'users',
						let: {
							userId: '$userId',
						},
						pipeline: [
							{
								$match: {
									$expr: {
										$eq: ['$_id', '$$userId'],
									},
								},
							},
						],
						as: 'user',
					},
				},
				{
					$unwind: '$user',
				},
				{
					$project: {
						'user.password': 0,
					},
				},
			])

			res.json(tweets)
		} catch (error) {
			next(error)
		}
	}

	async get(req, res, next) {
		try {
			const { userId, tweetId } = req.params

			const tweet = await TweetModel.findOne({
				_id: tweetId,
				userId,
			})

			res.json(tweet)
		} catch (error) {
			next(error)
		}
	}

	async create(req, res, next) {
		try {
			const { userId } = req.params
			const { text } = req.body

			const tweet = await TweetModel.create({
				text,
				publishTimestamp: Date.now(),
				userId,
			})

			res.json(tweet)
		} catch (error) {
			next(error)
		}
	}

	async delete(req, res, next) {
		try {
			const { userId, tweetId } = req.params

			await TweetModel.deleteOne({ userId, tweetId })

			res.json({ message: 'Success' })
		} catch (error) {
			next(error)
		}
	}
}

export default new TweetsController()
