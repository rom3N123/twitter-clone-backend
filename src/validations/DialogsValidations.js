import validator from 'express-validator';
import UserModel from '../models/UserModel.js';
import mongoose from 'mongoose';

export const DialogCreateValidation = [
	validator.body('creator', 'Enter creator id').isString().withMessage('Enter creator id'),
	validator
		.body('participants', 'Enter participants ids')
		.isArray()
		.withMessage('Enter participants ids')
		.custom(async (participantId) => {
			if (!mongoose.isValidObjectId(participantId)) {
				return Promise.reject(`${participantId} is invalid id`);
			}

			const participant = await UserModel.findById(participantId);

			if (!participant) {
				return Promise.reject(`Participant with id ${participantId} not found`);
			}
		}),
];
