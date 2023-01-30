import '$lib/models/user-model';
import '$lib/models/session-model';
import '$lib/models/key-model'

import lucia from 'lucia-auth';
import { dev } from '$app/environment';
import adapter from '@lucia-auth/adapter-mongoose';
import mongoose from 'mongoose';

export const auth = lucia({
	adapter: adapter(mongoose),
	env: dev ? 'DEV' : 'PROD',
	autoDatabaseCleanup: true,
	transformUserData: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			role: userData.role,
			resetRequestedAt: userData.resetRequestedAt,
			resetToken: userData.resetToken
		};
	}
});

export type Auth = typeof auth;
