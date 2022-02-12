import DialogMessageModel from '../models/DialogMessageModel.js';
import DialogsMessagesService from '../services/DialogsMessagesService.js';
import DialogModel from '../models/DialogModel.js';
import ApiError from '../exceptions/ApiError.js';

class DialogsMessagesController {
	async index(req, res, next) {
		try {
			const { dialogId } = req.params;

			const messages = await DialogMessageModel.find({
				dialog: dialogId,
			}).populate('dialog author');

			res.json(messages);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { id } = req.tokenValue;
			const { text, replyTo } = req.body;
			const { dialogId } = req.params;

			const message = await DialogsMessagesService.create(
				{
					text,
					author: id,
					replyTo,
					dialog: dialogId,
				},
				true
			);

			await DialogModel.updateOne(
				{ _id: dialogId },
				{
					$push: {
						messages: message._id,
					},
				}
			);

			res.json(message);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const { messagesIds } = req.body;

			await DialogMessageModel.deleteMany({
				_id: {
					$in: messagesIds,
				},
			});

			res.json({ status: 'success', message: 'Deleted' });
		} catch (error) {
			next(error);
		}
	}
}

export default new DialogsMessagesController();
