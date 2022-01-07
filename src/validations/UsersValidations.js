import validator from 'express-validator';

export const TweetCreationValidator = [
    validator
        .body('text', "Enter tweet's text")
        .isString()
        .withMessage(
            'Text should be minimum 10 and maximum 300 characters long',
        ),
];
