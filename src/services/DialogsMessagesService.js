import ApiError from '../exceptions/ApiError.js';
import DialogMessageModel from '../models/DialogMessageModel.js';
import DialogModel from '../models/DialogModel.js';

class DialogsMessagesService {
	/**
	 * @param {Types.ObjectId} dialogId
	 * @param {Types.ObjectId=} replyTo
	 * @returns string|undefined
	 */
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

	/**
	 *
	 * @param {object} message
	 * @param {string} message.text
	 * @param {string=} message.replyTo
	 * @param {string} message.author
	 * @param {boolean=} message.isSystem
	 * @param {string} message.dialog
	 *
	 * @param {boolean=} isWithPopulate
	 * @returns
	 */
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

		await DialogModel.updateOne(
			{ _id: dialog },
			{
				$push: {
					messages: message._id,
				},
			}
		);

		messageToReturn = !isWithPopulate
			? message
			: await DialogMessageModel.populate(message, { path: 'dialog author' });

		return messageToReturn;
	}
}

export default new DialogsMessagesService();
