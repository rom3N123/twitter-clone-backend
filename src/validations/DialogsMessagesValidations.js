import validator from 'express-validator';

export const DialogMessageCreateValidation = [
	validator.body('text').isString().withMessage('Enter message text'),
];
