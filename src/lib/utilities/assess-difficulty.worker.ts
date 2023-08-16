import SCORES from '$lib/data/scores';
import type { TileType } from '$lib/types/tile';
import type Tile from '$lib/types/tile';;

type State = {
	predefinedTiles: Tile[];
	zoneQueue: TileType[];
	selectedTiles: {
		tileIndex: number;
		tileType: TileType;
		score: number;
	}[];
	score: number;
};

const maxIterations = 200000;

function calculateScore(placedTiles: Tile[], tile: Tile) {
    let tileScore = 0;
    const adjacentTilesSet = new Set(tile.adjacentTiles);
    placedTiles.forEach((placedTile) => {
        if (adjacentTilesSet.has(placedTile.tileIndex)) {
            tileScore += SCORES[tile.tileType][placedTile.tileType] || 0;
        }
    });
    return Math.max(tileScore, 0);
}

function generateNextStates(state: State): State[] {
	let nextStates: State[] = [];
	let remainingTiles = state.predefinedTiles.filter((tile) => tile.tileType === 'default');
	let nextZone = state.zoneQueue[state.zoneQueue.length - 1];

	for (let tile of remainingTiles) {
		let nextState = JSON.parse(JSON.stringify(state));
		let nextTile = nextState.predefinedTiles.find((t: Tile) => t.tileIndex === tile.tileIndex);
		nextTile.tileType = nextZone;

		// Calculate the score for the new tile and add it to the overall score
		let tileScore = calculateScore(
			[
				...nextState.selectedTiles,
				{
					tileIndex: nextTile.tileIndex,
					tileType: nextZone
				}
			],
			nextTile
		); // Calculate the score
		nextTile.value = tileScore; // Store the score on the tile
		nextState.score += tileScore; // Add the score to the total

		nextState.zoneQueue.pop();
		nextState.selectedTiles.push({
			tileIndex: tile.tileIndex,
			tileType: nextZone,
			score: tileScore
		}); // Store the score in the selectedTiles

		nextStates.push(nextState);
	}

	return nextStates;
}

function assessDifficulty(predefinedTiles: Tile[], zoneQueue: TileType[]) {
	let initialScore = 0;
	let highScore = 0;
	let highScoreTiles = null;

	let selectedTilesInit = predefinedTiles
		.filter((tile) => tile.tileType !== 'default')
		.map((tile) => {
			return {
				tileIndex: tile.tileIndex,
				tileType: tile.tileType,
				score: 0
			};
		});

	let stack = [
		{
			predefinedTiles: JSON.parse(JSON.stringify(predefinedTiles)),
			zoneQueue: JSON.parse(JSON.stringify(zoneQueue)),
			selectedTiles: selectedTilesInit,
			score: initialScore
		}
	];

	let counter = 0;
    let tick = Date.now();

	while (stack.length > 0) {
		let state = stack.pop();

		if (state) {
			if (state.zoneQueue.length === 0) {
				if (state.score > highScore) {
					highScore = state.score;
					highScoreTiles = state.selectedTiles;
				}
			} else {
				let nextStates = generateNextStates(state);
				stack.push(...nextStates);
			}

			counter++;
			if (counter % maxIterations === 0) {
                console.log(`time spent: ${(Date.now() - tick) / 1000} seconds`);
                console.log(`score: ${highScore}`);
				return {easy: Math.round(.5 * highScore), medium: Math.round(.8 * highScore), hard: highScore};
			}
		}
	}
}

onmessage = (event: {data: {predefinedTiles: Tile[], zoneQueue: TileType[]}}) => {
    const {predefinedTiles, zoneQueue} = event.data;
    postMessage(assessDifficulty(predefinedTiles, zoneQueue))
};

export {};
