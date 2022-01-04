import TweetModel from '../models/TweetModel.js';

class TweetsController {
    async index(req, res) {
        try {
            const { userId } = req.params;

            const tweets = await TweetModel.find({
                userId,
            });

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

            if (!tweet) {
                throw new Error('Tweet not found');
            }

            res.json(tweet);
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
