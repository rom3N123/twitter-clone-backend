import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
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
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
    },
});

const ProfileModel = mongoose.model('Profile', profileSchema);

export { ProfileModel };
