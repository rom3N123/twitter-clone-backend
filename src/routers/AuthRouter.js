import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { RegisterValidation } from '../validations/AuthValidation.js';
import { BodyValidationMiddleware } from '../middlewares/BodyValidationMiddleware.js';

const router = express.Router();

router.route('/login').get(AuthController.login).post(AuthController.login);

router.post(
    '/register',
    RegisterValidation,
    BodyValidationMiddleware.validate,
    AuthController.register,
);

router.get('/logout');

export default router;
