import express from 'express';
import { DialogMessageCreateValidation } from '../validations/DialogsMessagesValidations.js';
import DialogsMessagesController from '../controllers/DialogsMessagesController.js';
import DialogMessageRouter from '../routers/DialogMessageRouter.js';
import { BodyValidationMiddleware } from '../middlewares/BodyValidationMiddleware.js';

const router = express.Router({
	mergeParams: true,
});

router
	.route('/')
	.get(DialogsMessagesController.index)
	.post(
		DialogMessageCreateValidation,
		BodyValidationMiddleware.validate,
		DialogsMessagesController.create
	)
	.delete(DialogsMessagesController.delete);

router.use('/:messageId', DialogMessageRouter);

export default router;
