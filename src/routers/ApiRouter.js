import express from 'express';
import { router as AuthRouter } from './AuthRouter.js';

const router = express.Router();

router.use('/auth', AuthRouter);

export { router };
