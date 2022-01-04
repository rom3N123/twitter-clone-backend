import mongoose from 'mongoose';
import UsersService from '../services/UsersService.js';

const { Schema, model, Types } = mongoose;

const tweetSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    publishTimestamp: {
        type: Number,
        required: true,
        immutable: true,
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
        immutable: true,
    },
});

const TweetModel = model('Tweet', tweetSchema);

export default TweetModel;
