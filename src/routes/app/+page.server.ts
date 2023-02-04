import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import * as Recipe from '$lib/recipe.model';
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
		recipes: Recipe.findByUser(user.id),
		runners: Runner.all(),
		token: generateTokenFor(user)
	};
};

export const actions: Actions = {
	logout: async (event) => {
		event.cookies.delete('AuthorizationToken');

		throw redirect(302, '/login');
	}
};
