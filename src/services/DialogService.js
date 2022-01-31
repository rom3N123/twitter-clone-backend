class DialogService {
	hasAccessToDialog(userId, dialog) {
		if (dialog.creator._id.toString() === userId) return true;

		return dialog.participants.some(({ id }) => id.toString() === participantId);
	}
}

export default new DialogService();
