import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import * as Runner from '$lib/runner.model';
import { generateTokenFor } from '$lib/user.model';

export const load: PageServerLoad = (event) => {
	const user = event.locals.user;

	if (!user) {
		throw error(401, {
			message: 'You must be logged in to view this page'
		});
	}

	return {
		user,
		runners: Runner.all(),
		token: generateTokenFor(user)
	};
};