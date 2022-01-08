import express from 'express'
import TweetsController from '../controllers/TweetsController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import { BodyValidationMiddleware } from '../middlewares/BodyValidationMiddleware.js'
import { TweetCreationValidator } from '../validations/UsersValidations.js'

const router = express.Router({
	mergeParams: true,
})

router
	.route('/')
	.get(TweetsController.index)
	.post(
		AuthMiddleware.areUsersTheSame,
		TweetCreationValidator,
		BodyValidationMiddleware.validate,
		TweetsController.create
	)

router
	.route('/:tweetId')
	.get(TweetsController.get)
	.delete(AuthMiddleware.areUsersTheSame, TweetsController.delete)

export default router
