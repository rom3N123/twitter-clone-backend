import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

export const tweetSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	publishTimestamp: {
		type: Number,
		required: true,
		immutable: true,
	},
	replyTo: {
		type: Types.ObjectId,
		ref: 'Tweet',
	},
	replies: [{ type: Types.ObjectId, ref: 'Tweet' }],
	retweets: [{ type: Types.ObjectId, ref: 'User' }],
	likes: [
		{
			type: Types.ObjectId,
			ref: 'User',
		},
	],
	user: {
		type: Types.ObjectId,
		ref: 'User',
		immutable: true,
	},
});

const TweetModel = model('Tweet', tweetSchema);

export default TweetModel;
