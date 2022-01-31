import ApiError from '../exceptions/ApiError.js';
import DialogModel from '../models/DialogModel.js';
import UserModel from '../models/UserModel.js';

class DialogsController {
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
}

export default new DialogsController();
