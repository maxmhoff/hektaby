import type Tile from '$lib/types/tile';
import { tiles, zoneQueue } from '$lib/stores/gameStore';
import { get } from 'svelte/store';
import SCORES from '$lib/data/scores';

function calculateScore(tile: Tile): number {
    let tileScore = 0;
    const currentTiles = get(tiles);
    const zQueue = get(zoneQueue);
    const nextZone = zQueue[zQueue.length -1];

    // Ensure we have scores for the nextZone
    if (SCORES[nextZone]) {
        tile.adjacentTiles.forEach((idx) => {
            const adjacentTile = currentTiles.find((t) => t.tileIndex === idx);
            if (adjacentTile && SCORES[nextZone][adjacentTile.tileType]) {
                tileScore += SCORES[nextZone][adjacentTile.tileType];
            }
        });
    }

    return Math.max(tileScore, 0);
}

export default calculateScore;
