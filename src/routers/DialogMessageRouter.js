import express from 'express';
import DialogMessageController from '../controllers/DialogMessageController.js';

const router = express.Router({
	mergeParams: true,
});

router
	.route('/')
	.get(DialogMessageController.index)
	.patch(DialogMessageController.update)
	.delete(DialogMessageController.delete);

export default router;
