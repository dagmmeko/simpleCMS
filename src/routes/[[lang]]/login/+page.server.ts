import { fail, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { LuciaError } from 'lucia-auth';
import { User } from '$lib/models/user-model';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	authUser: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get('floating_email');
		const password = form.get('floating_password');

		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid input'
			});
		}
		try {
			const key = await auth.validateKeyPassword('username', username, password);
			const session = await auth.createSession(key.userId);
			locals.setSession(session);
		} catch (error) {
			if (
				error instanceof LuciaError &&
				(error.message === 'AUTH_INVALID_KEY' || error.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					message: 'Incorrect username or password.'
				});
			}
			// database connection error
			console.error(error);
			return fail(500, {
				message: 'Unknown error occurred'
			});
		}
	},
	createUser: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get('floating_email');
		const password = form.get('floating_password');

		console.log({ e: username, p: password });

		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid input'
			});
		}

		try {
			const count = await User.count();
			console.log({count: count})
			if (count === 0) {
				const user = await auth.createUser({
					key: {
						providerId: 'username',
						providerUserId: username,
						password
					},
					attributes: {
						username,
						role: 'ADMIN',
						resetRequestedAt: undefined,
						resetToken: undefined
					}
				});

				console.log({u: user})

				const session = await auth.createSession(user.userId);
				locals.setSession(session);
			} else {
				console.log({ count: count });

				const user = await auth.createUser({
					key: {
						providerId: 'username',
						providerUserId: username,
						password
					},
					attributes: {
						username,
						role: 'USER',
						resetRequestedAt: undefined,
						resetToken: undefined
					}
				});

				const session = await auth.createSession(user.userId);
				locals.setSession(session);
			}
		} catch (error) {
			if ((error as any)?.code === 'P2002' && (error as any)?.message?.includes('username')) {
				return fail(400, {
					message: 'Username already in use'
				});
			}
			if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_KEY') {
				return fail(400, {
					message: 'Username already in use'
				});
			}
			console.error(error);
			return fail(500, {
				message: 'Unknown error occurred'
			});
		}
	},
	forgotPassword: async ({ request, locals }) => {
		const form = await request.formData();

		const username = form.get('floating_email');

		// const data = User.findOneAndUpdate(
		// 	{ provider_id: `username:${username}` },
		// 	{
		// 		resetRequestedAt: new Date(),
		// 		resetToken: ''
		// 	}
		// );
	}
};
