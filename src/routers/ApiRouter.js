import express from 'express';
import AuthRouter from './AuthRouter.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.use(AuthMiddleware.checkToken);

router.use('/auth', AuthRouter);

export default router;
