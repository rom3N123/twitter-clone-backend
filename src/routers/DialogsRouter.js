import express from 'express';
import DialogsController from '../controllers/DialogsController.js';
import { BodyValidationMiddleware } from '../middlewares/BodyValidationMiddleware.js';
import { DialogCreateValidation } from '../validations/DialogsValidations.js';

const router = express.Router();

router.post(
	'/',
	DialogCreateValidation,
	BodyValidationMiddleware.validate,
	DialogsController.create,
);

export default router;
