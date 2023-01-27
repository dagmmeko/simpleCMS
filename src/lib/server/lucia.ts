import  '$lib/models/user-model';
import '$lib/models/session-model';

import lucia from 'lucia-auth';
import { dev } from '$app/environment';
import adapter from '@lucia-auth/adapter-mongoose';
import mongoose from 'mongoose';

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
