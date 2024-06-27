import { getThemeFromTag } from '$lib/data/island-themes';
import approvedSeeds from '$lib/data/approve-seeds';
import { islandTheme } from '$lib/stores/gameStore';
import { get } from 'svelte/store';

function createSeed(): string {
	const firstWord =
		approvedSeeds.firstWords[Math.round(Math.random() * approvedSeeds.firstWords.length)];
	const secondWord =
		approvedSeeds.secondWords[Math.round(Math.random() * approvedSeeds.secondWords.length)];
	const lastWord =
		approvedSeeds.lastWords[Math.round(Math.random() * approvedSeeds.lastWords.length)];

	// to ensure we don't get the same theme twice in a row
	if (getThemeFromTag(firstWord)?.themeName === get(islandTheme).themeName) return createSeed();

	return `${firstWord}-${secondWord}-${lastWord}`;
}

export default createSeed;
