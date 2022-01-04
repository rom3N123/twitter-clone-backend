import express from 'express';
import UsersController from '../controllers/UsersController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.get('/', UsersController.getUsers);

router
    .route('/:userId')
    .get(UsersController.findById)
    .patch(AuthMiddleware.areUsersTheSame, UsersController.update);

router
    .route('/:userId/tweets')
    .get(UsersController.getUserTweets)
    .post(AuthMiddleware.areUsersTheSame, UsersController.createTweet)
    .delete(AuthMiddleware.areUsersTheSame, UsersController.deleteTweet);

export default router;
