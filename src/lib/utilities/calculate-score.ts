import type Tile from '$lib/types/tile';

function calculateScore(tiles: Tile[]): { score: number, updatedTiles: Tile[] } {
	let sumScore = 0;
	tiles.forEach((tile) => {
		let tileScore = 0;
		if (tile.tileType === 'residential') {
			tileScore = 2;
			tile.adjacentTiles.forEach((idx) => {
				const adjacentTile = tiles.find((tile) => tile.index === idx);
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
		if (tile.tileType === 'commercial') {
			tileScore = 0;
			tile.adjacentTiles.forEach((idx) => {
				const adjacentTile = tiles.find((tile) => tile.index === idx);
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
		if (tile.tileType === 'industrial') {
			tileScore = 1;
			tile.adjacentTiles.forEach((idx) => {
				const adjacentTile = tiles.find((tile) => tile.index === idx);
				if (adjacentTile) {
					if (adjacentTile.tileType === 'commercial') {
						tileScore++;
					}

					if (adjacentTile.tileType === 'industrial') {
						tileScore += 2;
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
		tile.value = tileScore;
		sumScore += tileScore;
	});

	return {score: sumScore, updatedTiles: tiles };
}

export default calculateScore;
