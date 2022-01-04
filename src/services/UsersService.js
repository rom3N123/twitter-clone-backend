import UserModel from '../models/UserModel.js';
import CloudinaryService from './CloudinaryService.js';

class UsersService {
    imageUpdateFields = ['background', 'avatar'];

    async findById(userId) {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('User not found');
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

    async getModelWithUser(models) {
        if (Array.isArray(models)) {
            return Promise.all(
                models.map(async (model) => {
                    const newModel = { ...model };
                    delete newModel.userId;
                    const user = await UserModel.findById(
                        model.userId,
                        'name registerTimestamp birthTimestamp tweets followers following location bio avatar background',
                    );
                    return { ...newModel, user };
                }),
            );
        } else {
            const newModel = { ...models };
            const user = await UserModel.findById(models.userId);
            delete newModel.userId;
            return { ...newModel, user };
        }
    }
}

export default new UsersService();
