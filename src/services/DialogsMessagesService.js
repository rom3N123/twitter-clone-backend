import ApiError from '../exceptions/ApiError.js';
import DialogMessageModel from '../models/DialogMessageModel.js';
import DialogModel from '../models/DialogModel.js';

class DialogsMessagesService {
	async isPossibleToCreateMessage({ dialogId, replyTo }) {
		let message;
		const dialog = await DialogModel.findById(dialogId);

		if (!dialog) {
			message = 'Dialog';
		}

		if (replyTo) {
			const replytoMessage = await DialogMessageModel.findById(replyTo);

			if (!replytoMessage) {
				message = 'Reply Message';
			}
		}

		return message;
	}

	async create(
		{ text, replyTo, author, isSystem, dialog },
		isWithPopulate = false
	) {
		const errorMessage = await this.isPossibleToCreateMessage({
			dialogId: dialog,
			replyTo,
		});

		if (errorMessage) {
			throw ApiError.NotFoundError(errorMessage);
		}

		let messageToReturn;

		const message = await DialogMessageModel.create({
			text,
			replyTo,
			author,
			isSystem,
			dialog,
			createdAt: Date.now(),
		});

		messageToReturn = !isWithPopulate
			? message
			: await DialogMessageModel.populate(message, { path: 'dialog author' });

		return messageToReturn;
	}
}

export default new DialogsMessagesService();
