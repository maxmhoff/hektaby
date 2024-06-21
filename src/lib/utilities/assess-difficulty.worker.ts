import type { TileType } from '$lib/types/tile';
import type Tile from '$lib/types/tile';
import calculateScore from './calculate-score';

type State = {
	tiles: Tile[];
	tileOrder: number[];
	score: number;
	zoneQueue: TileType[];
};

function generateChildren(state: State): State[] {
	const childStates: State[] = [];
	const availableTiles = state.tiles.filter((tile) => tile.tileType === 'default');

	availableTiles.forEach((tile) => {
		if (tile.tileType === 'default') {
			const newQueue = [...state.zoneQueue];
			const newTileType = newQueue.pop();
			if (newTileType) {
				const newTileValue = calculateScore(state.tiles, { ...tile, tileType: newTileType });

				childStates.push({
					tiles: state.tiles.map((t) =>
						t.tileIndex === tile.tileIndex
							? { ...t, tileType: newTileType, value: newTileValue }
							: t
					),
					tileOrder: [...state.tileOrder, tile.tileIndex],
					score: state.score + newTileValue,
					zoneQueue: newQueue
				});
			}
		}
	});

	return childStates;
}

function findMostPromisingStates(states: State[], beamSize: number): State[] {
	if (states.length === 0) return [];

	const scoredStates = states.map((state) => ({
		state,
		combinedScore: state.score + calcBlueGemPotential(state)
	}));

	return scoredStates
		.sort((a, b) => b.combinedScore - a.combinedScore)
		.slice(0, beamSize)
		.map((entry) => entry.state);
}

// a blue gem is a commercial zone which is placed in the center of a bunch of residential / industrial zones
function calcBlueGemPotential(state: State): number {
	let blueGemPotential = 0;

	// Find the last commercial zone in the queue
	const lastCommercialIndex = state.zoneQueue.lastIndexOf('commercial');
	if (lastCommercialIndex === -1) return blueGemPotential;

	// Count residential and industrial zones before the last commercial zone
	const residentialCount = state.zoneQueue
		.slice(0, lastCommercialIndex)
		.filter((zone) => zone === 'residential').length;
	const industrialCount = state.zoneQueue
		.slice(0, lastCommercialIndex)
		.filter((zone) => zone === 'industrial').length;

	// Iterate through tiles to calculate blue gem potential
	state.tiles.forEach((tile) => {
		if (tile.tileType === 'default' && tile.adjacentTiles.length >= 3) {
			// Check if the adjacent tiles are industrial, residential zones, or default with potential
			const suitableAdjacents = tile.adjacentTiles.filter((adjTile) => {
				const adj = state.tiles.find((t) => t.tileIndex === adjTile);
				if (!adj) return false;

				if (adj.tileType === 'industrial' || adj.tileType === 'residential') {
					return true;
				} else if (adj.tileType === 'default') {
					// Consider default tiles suitable if there are enough zones before the last commercial in the queue
					return residentialCount > 0 || industrialCount > 0;
				}
				return false;
			});

			if (suitableAdjacents.length) {
				blueGemPotential = Math.max(blueGemPotential, suitableAdjacents.length * 2);
			}
		}
	});

	return blueGemPotential;
}

function generateStateKey(state: State): string {
	const tileKey = state.tiles.map((tile) => `${tile.tileIndex}-${tile.tileType}`).join('|');
	return `${tileKey}-${state.score}`;
}

function assessDifficulty(predefinedTiles: Tile[], zoneQueue: TileType[]) {
	const start = Date.now();

	const seenStates = new Set<string>();
	const initialState: State = {
		tiles: predefinedTiles,
		tileOrder: [],
		score: 0,
		zoneQueue: zoneQueue
	};

	const beamSize = 10000;
	let currentDepth = 0;
	let currentStates: State[] = [initialState];

	while (currentDepth < zoneQueue.length) {
		currentDepth++;
		if (currentDepth > zoneQueue.length) break;

		let nextStates: State[] = [];

		currentStates.forEach((state) => {
			generateChildren(state).forEach((child) => {
				const stateKey = generateStateKey(child);
				if (!seenStates.has(stateKey)) {
					seenStates.add(stateKey);
					nextStates.push(child);
				}
			});
		});

		currentStates = findMostPromisingStates(nextStates, beamSize);
	}

	const solution = currentStates[0];

	return {
		score: solution.score,
		tileOrder: solution.tileOrder,
		elapsedTime: (Date.now() - start) / 1000
	};
}

onmessage = (event: { data: { predefinedTiles: Tile[]; zoneQueue: TileType[] } }) => {
	const { predefinedTiles, zoneQueue } = event.data;
	postMessage(assessDifficulty(predefinedTiles, zoneQueue));
};
