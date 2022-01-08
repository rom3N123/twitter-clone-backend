import express from 'express';
import FollowersController from '../controllers/FollowersController.js';

const router = express.Router({
	mergeParams: true,
});

router
	.route('/')
	.get(FollowersController.index)
	.post(FollowersController.follow);

router.delete('/:followerId', FollowersController.unfollow);

export default router;
