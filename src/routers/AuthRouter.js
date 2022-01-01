import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { RegisterValidation } from '../validations/AuthValidation.js';
import { BodyValidationMiddleware } from '../middlewares/BodyValidationMiddleware.js';

const router = express.Router();

router.route('/login').get(AuthController.login).post(AuthController.login);

router
    .route('/register')
    .post(
        RegisterValidation,
        BodyValidationMiddleware.validate,
        AuthController.register,
    );

export default router;
