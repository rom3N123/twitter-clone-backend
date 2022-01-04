import mongoose from 'mongoose';
import TweetModel from '../models/TweetModel.js';
import UserModel from '../models/UserModel.js';
import UsersService from '../services/UsersService.js';

class TweetsController {
    async index(req, res) {
        try {
            const { userId } = req.params;

            const tweets = await TweetModel.aggregate([
                {
                    $match: {
                        userId: mongoose.Types.ObjectId(userId),
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        let: {
                            userId: '$userId',
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$_id', '$$userId'],
                                    },
                                },
                            },
                        ],
                        as: 'user',
                    },
                },
                {
                    $unwind: '$user',
                },
                {
                    $project: {
                        'user.password': 0,
                    },
                },
            ]);

            res.json(tweets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async get(req, res) {
        try {
            const { userId, tweetId } = req.params;

            const tweet = await TweetModel.findOne({
                _id: tweetId,
                userId,
            });

            res.json(tweet);

            // TweetModel.findOne({
            //     _id: tweetId,
            //     userId,
            // })
            //     .lean()
            //     .exec(async (err, tweet) => {
            //         if (err) {
            //             throw new Error('Tweet not found');
            //         } else {
            //             const tweetWithUser =
            //                 await UsersService.getModelWithUser(tweet);
            //             res.json(tweetWithUser);
            //         }
            //     });
        } catch (error) {
            res.status(404).json({
                message: error.message,
            });
        }
    }

    async create(req, res) {
        try {
            const { userId } = req.params;
            const { text } = req.body;

            const tweet = await TweetModel.create({
                text,
                publishTimestamp: Date.now(),
                userId,
            });

            res.json(tweet);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { userId, tweetId } = req.params;

            await TweetModel.deleteOne({ userId, tweetId });

            res.json({ message: 'Success' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new TweetsController();
