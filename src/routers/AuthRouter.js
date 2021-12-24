import express from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { RegisterValidation } from '../validations/AuthValidation.js';
import { BodyValidationMiddleware } from '../middlewares/BodyValidationMiddleware.js';

const router = express.Router();

router.route('/login').get().post();

router
    .route('/register')
    .post(
        RegisterValidation,
        BodyValidationMiddleware.validate,
        AuthController.register,
    );

export { router };