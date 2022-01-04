import UserModel from '../models/UserModel.js';
import CloudinaryService from './CloudinaryService.js';

class UsersService {
    imageUpdateFields = ['background', 'avatar'];

    getUserWithoutPassword(user) {
        const {
            _doc: { password, ...otherFields },
        } = user;

        return otherFields;
    }

    async findById(userId) {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return this.getUserWithoutPassword(user);
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

            console.log(resultFields);

            const user = await UserModel.findByIdAndUpdate(
                userId,
                resultFields,
                {
                    new: true,
                },
            );

            return this.getUserWithoutPassword(user);
        } catch (e) {
            throw Error('User not found');
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
