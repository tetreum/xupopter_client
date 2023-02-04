import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { hasUsers } from '$lib/user.model';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (!user) {
		if ((await hasUsers())) {
			throw redirect(302, '/login');
		} else {
			throw redirect(302, '/signup');
		}
	}

	return {
		user
	};
};
