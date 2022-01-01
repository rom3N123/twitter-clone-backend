import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

import AuthRouter from './AuthRouter.js';
import UsersRouter from './UsersRouter.js';

const router = express.Router();

router.use(AuthMiddleware.checkToken);

router.use('/auth', AuthRouter);

router.use('/users', UsersRouter);

export default router;
