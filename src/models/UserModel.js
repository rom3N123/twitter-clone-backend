import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const userSchema = new Schema({
	email: {
		required: true,
		unique: true,
		type: String,
		select: false,
	},
	password: {
		required: true,
		type: String,
		select: false,
	},
	name: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
	},
	registerTimestamp: {
		type: Number,
		required: true,
		immutable: true,
	},
	birthTimestamp: {
		type: Number,
		required: true,
	},
	location: {
		type: String,
	},
	avatar: {
		type: String,
	},
	background: {
		type: String,
	},
	followers: [{ type: Types.ObjectId, ref: 'User' }],
	following: [{ type: Types.ObjectId, ref: 'User' }],
});

const UserModel = model('User', userSchema);

export default UserModel;
