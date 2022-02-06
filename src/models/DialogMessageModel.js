import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const dialogMessageSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	isEdited: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Number,
		immutable: true,
		required: true,
	},
	replyTo: {
		type: Types.ObjectId,
		ref: 'Message',
		default: null,
	},
	isSystem: {
		type: Boolean,
		immutable: true,
		default: false,
	},
	dialog: {
		type: Types.ObjectId,
		ref: 'Dialog',
		required: true,
		immutable: true,
	},
	author: { type: Types.ObjectId, ref: 'User', immutable: true },
});

const DialogMessageModel = model('Message', dialogMessageSchema);

export default DialogMessageModel;
