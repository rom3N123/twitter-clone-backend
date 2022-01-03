import cloudinary from '../configs/cloudinaryConfig.js';

class CloudinaryService {
    async saveAvatar(encodedFile) {
        const { public_id, format } = await this.uploadFile(encodedFile);

        const url = await cloudinary.url(`${public_id}.${format}`, {
            width: 385,
            height: 385,
            radius: 'max',
            crop: 'fill',
        });

        return url;
    }

    async saveBackground(enconedFile) {
        const { public_id, format } = await this.uploadFile(enconedFile);

        const url = await cloudinary.url(`${public_id}.${format}`, {
            height: 250,
            width: 900,
            crop: 'fill',
        });

        return url;
    }

    uploadFile(encodedFile, options = {}) {
        return cloudinary.uploader.upload(encodedFile, options);
    }
}

export default new CloudinaryService();
