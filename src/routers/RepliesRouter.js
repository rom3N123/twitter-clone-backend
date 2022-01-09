import express from 'express';
import RepliesController from '../controllers/RepliesController.js';
import { TweetCreationValidator } from '../validations/UsersValidations.js';

const router = express.Router({
	mergeParams: true,
});

router
	.route('/')
	.get(RepliesController.index)
	.post(TweetCreationValidator, RepliesController.create);

router.delete('/:replyId', RepliesController.delete);

export default router;
