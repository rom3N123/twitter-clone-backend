import express from 'express';
import UsersController from '../controllers/UsersController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import FollowersRouter from '../routers/FollowersRouter.js';
import FollowingRouter from '../routers/FollowingRouter.js';
import TweetsRouter from './TweetsRouter.js';

const router = express.Router();

router.get('/search', UsersController.search);

router
	.route('/:userId')
	.get(UsersController.get)
	.patch(AuthMiddleware.areUsersTheSame, UsersController.update);

router.use('/:userId/tweets', TweetsRouter);

router.use('/:userId/followers', FollowersRouter);

router.use('/:userId/following', FollowingRouter);

export default router;
