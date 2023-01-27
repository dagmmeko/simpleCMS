import lucia from 'lucia-auth';
import { dev } from '$app/environment';
import adapter from '@lucia-auth/adapter-mongoose';
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

export const Session = mongoose.model(
	'session',
	new mongoose.Schema(
		{
			_id: {
				type: String
			},
			user_id: {
				type: String,
				required: true
			},
			expires: {
				type: Number,
				required: true
			},
			idle_expires: {
				type: Number,
				required: true
			}
		},
		{ _id: false }
	)
);

export const auth = lucia({
	adapter: adapter(mongoose),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (userData) => {
		return {
			userId: userData.id,
			username: userData.username
		};
	}
});

export type Auth = typeof auth;
