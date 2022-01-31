import express from 'express';
import DialogsMessagesController from '../controllers/DialogsMessagesController.js';

import DialogMessageRouter from '../routers/DialogMessageRouter.js';

const router = express.Router({
	mergeParams: true,
});

router
	.route('/')
	.get(DialogsMessagesController.index)
	.post(DialogsMessagesController.create)
	.delete(DialogsMessagesController.delete);

router.use('/:messageId', DialogMessageRouter);

export default router;
