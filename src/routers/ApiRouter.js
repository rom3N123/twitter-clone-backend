import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

import AuthRouter from './AuthRouter.js';
import UsersRouter from './UsersRouter.js';
import errorMiddleware from '../middlewares/ErrorMiddleware.js';

const router = express.Router();

router.use(AuthMiddleware.checkToken);
router.use(AuthMiddleware.decodeToken);

router.use('/auth', AuthRouter);

router.use('/users', UsersRouter);

router.use(errorMiddleware);

export default router;
