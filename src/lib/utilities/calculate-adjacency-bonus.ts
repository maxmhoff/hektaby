import { zoneQueue } from "$lib/stores/gameStore";
import type Tile from "$lib/types/tile";
import { get } from "svelte/store";

function calculateAdjacencyBonus(tile: Tile): number {
    const zQueue = get(zoneQueue);
	const nextZone = zQueue[zQueue.length -1];
    if (tile.tileType === 'residential') {
        if (nextZone === 'residential') return 1;
        if (nextZone === 'commercial') return 2;
        if (nextZone === 'industrial') return 0;
    }
    if (tile.tileType === 'commercial') {
        if (nextZone === 'residential') return 1;
        if (nextZone === 'commercial') return -1;
        if (nextZone === 'industrial') return 1;
    }
    if (tile.tileType === 'industrial') {
        if (nextZone === 'residential') return -1;
        if (nextZone === 'commercial') return 2;
        if (nextZone === 'industrial') return 1;
    }
    if (tile.tileType === 'power plant') {
        if (nextZone === 'residential') return -2;
        if (nextZone === 'commercial') return -2;
        if (nextZone === 'industrial') return 2;
    }
    return 0;
}

export default calculateAdjacencyBonus;