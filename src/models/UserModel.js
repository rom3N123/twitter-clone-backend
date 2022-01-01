import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        unique: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
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
    },
    birthTimestamp: {
        type: Number,
        required: true,
    },
    tweets: {
        type: [Number],
    },
    followers: {
        type: [Number],
    },
    following: {
        type: [Number],
    },
});

const UserModel = mongoose.model('User', userSchema);

export { UserModel };
