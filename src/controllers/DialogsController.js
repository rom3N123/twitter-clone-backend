import ApiError from '../exceptions/ApiError.js';
import DialogModel from '../models/DialogModel.js';
import UserModel from '../models/UserModel.js';
import DialogService from '../services/DialogService.js';

class DialogsController {
	async index(req, res, next) {
		try {
			const { id } = req.tokenValue;

			const dialogs = await DialogModel.find({
				$or: [{ creator: id }, { participants: id }],
			})
				.populate('participants creator')
				.populate({
					path: 'messages',
					populate: {
						path: 'author',
						model: 'User',
					},
				});

			res.json(dialogs);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { participants, creator } = req.body;

			const user = await UserModel.findById(creator);

			if (!user) {
				throw ApiError.NotFoundError('User');
			}

			const createdDialog = await DialogModel.create({
				creator,
				participants,
			});

			const populatedDialog = await UserModel.populate(createdDialog, {
				path: 'creator participants',
			});

			res.json(populatedDialog);
		} catch (error) {
			next(error);
		}
	}

	async get(req, res, next) {
		try {
			const { dialogId } = req.params;
			const { id } = req.tokenValue;

			const dialog = await DialogModel.findById(dialogId).populate(
				'creator participants'
			);

			if (!dialog) {
				throw ApiError.NotFoundError('Dialog');
			}

			const hasAccess = DialogService.hasAccessToDialog(id, dialog);

			if (!hasAccess) {
				throw ApiError.BadRequestError();
			}

			res.json(dialog);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const { dialogId } = req.params;
			const { id } = req.tokenValue;

			const dialog = await DialogModel.findById(dialogId);

			if (dialog.creator.toString() === id) {
				await DialogModel.findByIdAndDelete(id);

				return res.json({ status: 'success', message: 'Deleted' });
			}

			return res.status(400).json({
				status: 'fail',
				message: "You don't have a permission to delete the dialog",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new DialogsController();
