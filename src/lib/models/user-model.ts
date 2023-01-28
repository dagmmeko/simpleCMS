import mongoose from 'mongoose';

const UserSchema = 
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
			hashed_password: String,
			username: String,
			role: String
		},
		{ _id: false }
	)

export const User = mongoose.models.User ?? mongoose.model('user', UserSchema)