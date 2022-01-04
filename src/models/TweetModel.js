import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const tweetSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    publishTimestamp: {
        type: Types.ObjectId,
        required: true,
    },
    comments: {
        type: [Types.ObjectId],
    },
    likes: {
        type: [Types.ObjectId],
    },
    retweets: {
        type: [Types.ObjectId],
    },
    userId: {
        type: Types.ObjectId,
        required: true,
    },
});

const TweetModel = model('Tweet', tweetSchema);

export default TweetModel;
