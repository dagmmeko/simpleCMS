import { auth } from '$lib/server/lucia';
import { fail, type Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';
import type { PageServerLoad } from './$types';
import { User } from '$lib//server/lucia';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');
		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid input'
			});
		}
		
		try {		
			const data = User.count(function (err, count){
				if (!err && count === 0){
					console.log("no accounts")
				}
				else{
					console.log({count: count})
				}
			})
			const user = await auth.createUser('username', username, {
				password,
				attributes: {
					username
				}
			});
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch (error) {
			if (
				error
				// TODO: convert to mongoose
			    // instanceof Prisma.PrismaClientKnownRequestError &&
				// error.code === 'P2002' &&
				// error.message?.includes('username')
			) {
				return fail(400, {
					message: 'Username already in use'
				});
			}
			if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_PROVIDER_ID') {
				return fail(400, {
					message: 'Username already in use'
				});
			}
			console.error(error);
			return fail(500, {
				message: 'Unknown error occurred'
			});
		}
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) throw redirect(302, '/');
	return {};
};
