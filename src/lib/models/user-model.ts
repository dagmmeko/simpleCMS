import mongoose from 'mongoose';

export const User = mongoose.model(
	'user',
	new mongoose.Schema(
		{
			_id: {
				type: String
			},
			provider_id: {
				type: String,
				unique: true,
				required: true
			},
			hashed_password: String
		},
		{ _id: false }
	)
);