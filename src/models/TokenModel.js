import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const tokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Number,
        required: true,
    },
    userId: {
        type: Types.ObjectId,
        required: true,
        immutable: true,
    },
});

const TokenModel = model('Token', tokenSchema);

export default TokenModel;
