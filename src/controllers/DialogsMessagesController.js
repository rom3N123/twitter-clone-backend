import DialogModel from '../models/DialogModel.js';

class DialogsMessagesController {
	async index(req, res, next) {
		try {
			const { dialogId } = req.params;

			const messages = await DialogModel.findById(dialogId).populate('messages');

			res.json(messages);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
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

export default new DialogsMessagesController();
