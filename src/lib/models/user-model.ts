import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		_id: {
			type: String
		},
		username: String,
		role: String,
		resetRequestedAt: String,
		resetToken: String
	},
	{ _id: false }
);

export const User = mongoose.models.user ?? mongoose.model('user', UserSchema);
