import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import approvedSeeds from '$lib/data/approve-seeds';

export const load = (async ({ params }) => {
	const paramsStrings = params.seed.split('-');
	if (
		paramsStrings.length !== 3 ||
		!approvedSeeds.firstWords.includes(paramsStrings[0]) ||
		!approvedSeeds.secondWords.includes(paramsStrings[1]) ||
		!approvedSeeds.lastWords.includes(paramsStrings[2])
	) {
		
		throw redirect(308, '/');
	}
	
	return {
		seed: params.seed
	};
	
}) satisfies PageServerLoad;
