import DialogMessageModel from '../models/DialogMessageModel.js';
import ApiError from '../exceptions/ApiError.js';
import DialogMessageService from '../services/DialogMessageService.js';

class DialogMessageController {
	async index(req, res, next) {
		try {
			const { messageId } = req.params;

			const message = await DialogMessageModel.findById(messageId).populate(
				'dialog author'
			);

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
			const { dialogId, messageId } = req.params;
			const { text } = req.body;

			const updatedMessage = await DialogMessageService.update({
				text,
				messageId,
				dialogId,
			});

			res.json(updatedMessage);
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
