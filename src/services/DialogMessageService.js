import ApiError from '../exceptions/ApiError.js';
import DialogsMessagesService from '../services/DialogsMessagesService.js';
import DialogMessageModel from '../models/DialogMessageModel.js';

class DialogMessageService {
	/**
	 * @param {string} text
	 * @param {strng} dialogId
	 * @param {string=} replyTo
	 * @returns Error|object
	 */
	async update({ text, messageId, dialogId }) {
		const errorMessage = await DialogsMessagesService.isPossibleToCreateMessage(
			{
				dialogId,
			}
		);

		if (errorMessage) {
			throw ApiError.NotFoundError(errorMessage);
		}

		const updatedMessage = await DialogMessageModel.findByIdAndUpdate(
			messageId,
			{ text, isEdited: true },
			{
				new: true,
			}
		).populate('dialog author');

		return updatedMessage;
	}
}

export default new DialogMessageService();
