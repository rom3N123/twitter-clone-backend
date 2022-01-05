import UserModel from '../models/UserModel.js';
import CloudinaryService from './CloudinaryService.js';
import ApiError from '../exceptions/ApiError.js';

class UsersService {
    imageUpdateFields = ['background', 'avatar'];

    async findById(userId) {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw ApiError.NotFoundError('User');
        }

        return user;
    }

    async update(userId, fields) {
        try {
            const resultFields = { ...fields };

            if (this.imageUpdateFields.some((field) => field in fields)) {
                const { avatar, background } = await this.updateUserImageField(
                    fields,
                );
                if (avatar) {
                    resultFields.avatar = avatar;
                }
                if (background) {
                    resultFields.background = background;
                }
            }

            const user = await UserModel.findByIdAndUpdate(
                userId,
                resultFields,
                {
                    new: true,
                },
            );

            return user;
        } catch (e) {
            throw ApiError.NotFoundError('User');
        }
    }

    async updateUserImageField({ avatar, background }) {
        const result = {};

        if (avatar) {
            const avatarUrl = await CloudinaryService.saveAvatar(avatar);
            result.avatar = avatarUrl;
        }

        if (background) {
            const backgroundUrl = await CloudinaryService.saveBackground(
                background,
            );
            result.background = backgroundUrl;
        }

        return result;
    }
}

export default new UsersService();
