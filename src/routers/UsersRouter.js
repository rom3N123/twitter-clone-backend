import express from 'express';
import UsersController from '../controllers/UsersController.js';

const router = express.Router();

router.get('/', UsersController.getUsers);

router
    .route('/:userId')
    .get(UsersController.findById)
    .patch(UsersController.update);

export default router;
