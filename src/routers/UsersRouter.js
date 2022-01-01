import express from 'express';
import UsersController from '../controllers/UsersController.js';

const router = express.Router();

router.use('/', UsersController.getUsers);

export default router;
