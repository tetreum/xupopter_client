import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createUser, hasUsers } from '$lib/user.model';

export const load: PageServerLoad = async (event) => {
	const user = event.locals.user;

	if (user) {
		throw redirect(302, '/app');
	} else if ((await hasUsers())) {
		throw redirect(302, '/login');
	}
};

export const actions: Actions = {
	default: async (event) => {

		if ((await hasUsers())) {
			throw redirect(302, '/login');
		}

		const formData = Object.fromEntries(await event.request.formData());

		// Verify that we have an email and a password
		if (!formData.email || !formData.password) {
			return fail(400, {
				error: 'Missing email or password'
			});
		}

		const { email, password } = formData as { email: string; password: string };

		// Create a new user
		const { error, token } = await createUser(email, password);

		// If there was an error, return an invalid response
		if (error) {
			return fail(500, {
				error
			});
		}

		// Set the cookie
		event.cookies.set('AuthorizationToken', `Bearer ${token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		throw redirect(302, '/app');
	}
};
