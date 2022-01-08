import express from 'express';
import UsersController from '../controllers/UsersController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import FollowersRouter from '../routers/FollowersRouter.js';
import TweetsRouter from './TweetsRouter.js';

const router = express.Router();

router
	.route('/:userId')
	.get(UsersController.get)
	.patch(AuthMiddleware.areUsersTheSame, UsersController.update);

router.use('/:userId/tweets', TweetsRouter);

router.use('/:userId/followers', FollowersRouter);

export default router;
