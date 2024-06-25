import { get } from 'svelte/store';
import { aiSolution, difficulties } from '$lib/stores/gameStore';
import type Tile from '$lib/types/tile';
import type { TileType } from '$lib/types/tile';

async function loadWorker(
	tiles: Tile[],
	zoneQueue: TileType[],
	beamSize: number,
	blueGemPotentialWeight: number
) {
	aiSolution.set({
		state: 'loading',
		score: 0,
		elapsedTime: 0,
		tileOrder: [],
		numOfHighestScoringStates: 0,
		beamSize,
		blueGemPotentialWeight
	});
	const AssessDifficultyWorker = await import('$lib/utilities/assess-difficulty.worker?worker');
	const assessDifficultyWorker = new AssessDifficultyWorker.default();
	assessDifficultyWorker.onmessage = (event: {
		data: {
			elapsedTime: number;
			tileOrder: number[];
			score: number;
			numOfHighestScoringStates: number;
		};
	}) => {
		onMessage(event);
	};
	assessDifficultyWorker.postMessage({ predefinedTiles: tiles, zoneQueue, beamSize, blueGemPotentialWeight });
}

function onMessage(event: {
	data: {
		elapsedTime: number;
		tileOrder: number[];
		score: number;
		numOfHighestScoringStates: number;
	};
}) {
	const { elapsedTime, tileOrder, score, numOfHighestScoringStates } = event.data;
	const currentBeamSize = get(aiSolution).beamSize;
	const currentBlueGemPotentialWeight = get(aiSolution).blueGemPotentialWeight;
	aiSolution.set({
		state: 'ready',
		score,
		elapsedTime,
		tileOrder,
		numOfHighestScoringStates,
		beamSize: currentBeamSize,
		blueGemPotentialWeight: currentBlueGemPotentialWeight
	});
	difficulties.set({
		easy: Math.round(0.5 * score),
		medium: Math.round(0.8 * score),
		hard: Math.round(1 * score)
	});
}

export default loadWorker;
