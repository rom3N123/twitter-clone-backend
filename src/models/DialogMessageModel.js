import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const dialogMessageSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	isEdited: {
		type: Boolean,
	},
	createdAt: {
		type: Number,
		immutable: true,
		required: true,
	},
	replyTo: {
		type: Types.ObjectId,
		ref: 'Message',
	},
	isSystem: {
		type: Boolean,
		immutable: true,
	},
	author: { type: Types.ObjectId, ref: 'User', immutable: true },
});

const DialogMessage = model('Message', dialogMessageSchema);

export default DialogMessage;
