import { ProfileModel } from '../models/ProfileModel';
import { UserModel } from '../models/UserModel';

class _ProfileService {
    async getProfileByUserId(userId) {
        const {
            _doc: { _id, email },
        } = await UserModel.findById(userId);

        const {
            _doc: { userId, ...profile },
        } = await ProfileModel.findOne({ userId });

        return {
            id: _id,
            email,
            ...profile,
        };
    }
}

const ProfileService = new _ProfileService();

export { ProfileService };
