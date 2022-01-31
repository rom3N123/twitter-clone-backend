import DialogMessageModel from '../models/DialogMessageModel.js';
import ApiError from '../exceptions/ApiError.js';

class DialogMessageController {
	async index(req, res, next) {
		try {
			const { messageId } = req.params;

			const message = await DialogMessageModel.findById(messageId);

			if (!message) {
				throw ApiError.NotFoundError('Message');
			}

			res.json(message);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const { messageId } = req.params;

			const message = await DialogMessageModel.findById(messageId);

			// const updatedMessage = await DialogMessageModel.findByIdAndUpdate(
			// 	messageId,
			// 	req.body,
			// 	{
			// 		new: true,
			// 	}
			// );
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
		} catch (error) {
			next(error);
		}
	}
}

export default new DialogMessageController();
