import validator from 'express-validator';
import { UserModel } from '../models/UserModel.js';

export const RegisterValidation = [
    validator
        .body('email', 'Enter E-Mail')
        .isEmail()
        .withMessage('Incorrect E-Mail')
        .isLength({ min: 8 })
        .withMessage('E-Mail must consist at least of 8 characters')
        .custom(async (email) => {
            const user = await UserModel.findOne({ email });

            if (user) {
                return Promise.reject('Email is busy');
            }
        }),
    validator
        .body('password', 'Enter password')
        .isString()
        .withMessage('Incorrect password')
        .isLength({ min: 8 })
        .withMessage('Password must consist at least of 8 characters'),
    validator
        .body('birthTimestamp', 'Enter birthdate')
        .isNumeric()
        .withMessage('Enter birthdate timestamp'),
    validator
        .body('name', 'Enter your name')
        .isString()
        .withMessage('Incorrect name')
        .isLength({ min: 3, max: 50 })
        .withMessage(
            'Name must have at least 3 characters and must not exceed 50 characters',
        ),
];
