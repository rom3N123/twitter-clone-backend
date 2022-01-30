import express from 'express';
import FollowingController from '../controllers/FollowingController.js';

const router = express.Router({
	mergeParams: true,
});

router.route('/').get(FollowingController.index);

export default router;
