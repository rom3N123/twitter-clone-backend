import express from 'express';
import UsersController from '../controllers/UsersController.js';

const router = express.Router();

router.get('/', UsersController.getUsers);

router.get('/:userId', UsersController.findById);

export default router;
