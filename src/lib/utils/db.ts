import mongoose from 'mongoose';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

export const dbConnect: Handle = async ({ resolve, event }) => {
	mongoose.set('strictQuery', false);
    
	await mongoose.connect(DB_HOST, {
		autoIndex: false,
		authSource: 'admin',
		user: DB_USER,
		pass: DB_PASSWORD,
		dbName: DB_NAME
	});

	return await resolve(event);
};
