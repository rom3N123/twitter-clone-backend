import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const dialogSchema = new Schema({
	participants: {
		type: [{ type: Types.ObjectId, ref: 'User' }],
		required: true,
	},
	messages: {
		type: [Types.ObjectId],
		ref: 'Message',
		required: true,
	},
	creator: {
		type: Types.ObjectId,
		ref: 'User',
		immutable: true,
		required: true,
	},
});

const DialogModel = model('Dialog', dialogSchema);

export default DialogModel;
