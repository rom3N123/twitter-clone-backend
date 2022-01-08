import mongoose from 'mongoose';

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
	user: {
		type: Types.ObjectId,
		ref: 'User',
		immutable: true,
	},
});

const TweetModel = model('Tweet', tweetSchema);

export default TweetModel;
