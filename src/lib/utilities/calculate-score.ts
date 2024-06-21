import SCORES from "$lib/data/scores";
import type Tile from "$lib/types/tile";

function calculateScore(tiles: Tile[], updatedTile: Tile) {
    let tileScore = 0;
    const adjacentTilesSet = new Set(updatedTile.adjacentTiles);
    tiles.forEach((tile) => {
        if (adjacentTilesSet.has(tile.tileIndex)) {
            tileScore += SCORES[updatedTile.tileType][tile.tileType] || 0;
        }
    });
    return Math.max(tileScore, 0);
}

export default calculateScore;
