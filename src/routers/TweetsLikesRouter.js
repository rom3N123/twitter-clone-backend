import express from 'express';
import TweetsLikesController from '../controllers/TweetsLikesController.js';

const router = express.Router({
	mergeParams: true,
});

router
	.route('/')
	.get(TweetsLikesController.index)
	.post(TweetsLikesController.like);

export default router;
