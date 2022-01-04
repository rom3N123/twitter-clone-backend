import express from 'express';
import UsersController from '../controllers/UsersController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';
import { BodyValidationMiddleware } from '../middlewares/BodyValidationMiddleware.js';
import { TweetCreationValidator } from '../validations/UsersValidations.js';
import TweetsController from '../controllers/TweetsController.js';

const router = express.Router();

router
    .route('/:userId')
    .get(UsersController.get)
    .patch(AuthMiddleware.areUsersTheSame, UsersController.update);

router
    .route('/:userId/tweets')
    .get(TweetsController.index)
    .post(
        AuthMiddleware.areUsersTheSame,
        TweetCreationValidator,
        BodyValidationMiddleware.validate,
        TweetsController.create,
    );

router
    .route('/:userId/tweets/:tweetId')
    .get(TweetsController.get)
    .delete(AuthMiddleware.areUsersTheSame, TweetsController.delete);

export default router;
