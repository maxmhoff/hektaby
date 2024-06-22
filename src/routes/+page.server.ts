import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import createSeed from '$lib/utilities/create-seed';

export const load = (async () => {
	throw redirect(308, `${createSeed()}`);
}) satisfies PageServerLoad;
