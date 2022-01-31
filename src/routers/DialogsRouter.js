import express from 'express';
import DialogsController from '../controllers/DialogsController.js';
import { BodyValidationMiddleware } from '../middlewares/BodyValidationMiddleware.js';
import { DialogCreateValidation } from '../validations/DialogsValidations.js';

import DialogMessagesRouter from '../routers/DialogMessagesRouter.js';

const router = express.Router();

router.post(
	'/',
	DialogCreateValidation,
	BodyValidationMiddleware.validate,
	DialogsController.create,
);

router.route('/:dialogId').get(DialogsController.get).delete(DialogsController.delete);

router.use('/:dialogId/messages', DialogMessagesRouter);

export default router;
