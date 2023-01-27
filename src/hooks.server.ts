
import { auth } from '$lib/server/lucia';
import { dbConnect } from '$lib/utils/db';
import { handleHooks } from '@lucia-auth/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(dbConnect, handleHooks(auth));
