import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const dialogSchema = new Schema({
	messages: {
		type: [{ type: Types.ObjectId, ref: 'Message' }],
	},
	participants: {
		type: [{ type: Types.ObjectId, ref: 'User' }],
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
