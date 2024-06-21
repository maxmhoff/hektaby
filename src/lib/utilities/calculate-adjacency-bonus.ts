import SCORES from '$lib/data/scores';
import { zoneQueue } from '$lib/stores/gameStore';
import type Tile from '$lib/types/tile';
import { get } from 'svelte/store';

function calculateAdjacencyBonus(tile: Tile): number {
	const zQueue = get(zoneQueue);
	const nextZone = zQueue[zQueue.length - 1];

	return SCORES[nextZone]?.[tile.tileType] || 0;
}

export default calculateAdjacencyBonus;
