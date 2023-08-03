import type Tile from '$lib/types/tile';
import { tiles, zoneQueue } from '$lib/stores/gameStore';
import { get } from 'svelte/store';

function calculateScore(tile: Tile): number {
	let tileScore = 0;
	const currentTiles = get(tiles);
	const zQueue = get(zoneQueue);
	const nextZone = zQueue[zQueue.length -1];
	if (nextZone === 'residential') {
		tile.adjacentTiles.forEach((idx) => {
			const adjacentTile = currentTiles.find((t) => t.index === idx);
			if (adjacentTile) {
				if (adjacentTile.tileType === 'residential') {
					tileScore++;
				}

				if (adjacentTile.tileType === 'commercial') {
					tileScore++;
				}

				if (adjacentTile.tileType === 'industrial') {
					tileScore--;
				}

				if (adjacentTile.tileType === 'power plant') {
					tileScore -= 2;
				}
			}
		});
	}
	if (nextZone === 'commercial') {
		tile.adjacentTiles.forEach((idx) => {
			const adjacentTile = currentTiles.find((t) => t.index === idx);
			if (adjacentTile) {
				if (adjacentTile.tileType === 'residential') {
					tileScore += 2;
				}

				if (adjacentTile.tileType === 'commercial') {
					tileScore--;
				}

				if (adjacentTile.tileType === 'industrial') {
					tileScore += 2;
				}

				if (adjacentTile.tileType === 'power plant') {
					tileScore -= 2;
				}
			}
		});
	}
	if (nextZone === 'industrial') {
		tile.adjacentTiles.forEach((idx) => {
			const adjacentTile = currentTiles.find((t) => t.index === idx);
			if (adjacentTile) {
				if (adjacentTile.tileType === 'commercial') {
					tileScore++;
				}

				if (adjacentTile.tileType === 'industrial') {
					tileScore += 1;
				}

				if (adjacentTile.tileType === 'power plant') {
					tileScore += 2;
				}
			}
		});
	}
	if (tileScore < 0) {
		tileScore = 0;
	}
	return tileScore;
}

export default calculateScore;
