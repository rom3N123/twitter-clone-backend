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
    birthTimestamp: {
        required: true,
        type: Number,
    },
    name: {
        required: true,
        type: String,
    },
    registeredAt: {
        required: true,
        type: Number,
    },
});

const UserModel = mongoose.model('User', userSchema);

export { UserModel };
