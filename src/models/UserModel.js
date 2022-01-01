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
});

const UserModel = mongoose.model('User', userSchema);

export { UserModel };
