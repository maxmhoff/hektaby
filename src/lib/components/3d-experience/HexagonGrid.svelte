<script lang="ts">
	import predefinedTiles from '$lib/data/predefined-tiles';
	import GridTile from '$lib/components/3d-experience/GridTile.svelte';
	import deepCloneArray from '$lib/utilities/deepclone-array';
	import generateSeededRandom from '$lib/utilities/generate-seeded-random';
	import shuffleArray from '$lib/utilities/shuffle-array';
	import type { TileType } from '$lib/types/tile';
	import { difficulties, gameState, seed, specialZones, tiles, zoneQueue } from '$lib/stores/gameStore';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import animationSettings from '$lib/data/animation-settings';

    let seedFragments: string[] = [];
	const defaultBoardPositionY = 4;
	const boardPositionY = tweened(defaultBoardPositionY, animationSettings.gameFinished)

	$: if($gameState === 'loading') initializeGrid();
	$: if($gameState === 'finished') {
		boardPositionY.set(0);
	} else {
		boardPositionY.set(defaultBoardPositionY, animationSettings.gameStart);
	}

    onMount(() => initializeGrid());

	export function initializeGrid() {
		seedFragments = $seed.split('-');
		tiles.set(deepCloneArray(predefinedTiles));
		const missingTiles = Math.round(generateSeededRandom(seedFragments[0]) * 3) + 2;
		Array.from({ length: missingTiles }, () => removeTile());
		zoneQueue.set(createZoneQueue());
		$tiles[Math.round(generateSeededRandom(seedFragments[1]) * ($tiles.length - 1))].tileType =
			'power plant';
		gameState.set('in progress');
	}

	function createZoneQueue(): TileType[] {
		const zoneQueue: TileType[] = [];
		const availableTiles = $tiles.length - $specialZones;
		const seedValue = generateSeededRandom($seed);

		const residentialTiles = Math.round(seedValue * (availableTiles - 5)) + 1;
		const commercialTiles = Math.round(seedValue * (availableTiles - residentialTiles - 3)) + 1;
		const industrialTiles = availableTiles - residentialTiles - commercialTiles;

		zoneQueue.push(...Array(residentialTiles).fill('residential'));
		zoneQueue.push(...Array(commercialTiles).fill('commercial'));
		zoneQueue.push(...Array(industrialTiles).fill('industrial'));

		shuffleArray(zoneQueue, seedFragments[2]);
		return zoneQueue;
	}

	function removeTile(i: number = 2) {
		const tilesThatCanBeRemoved = $tiles.filter((tile) =>
			tile.adjacentTiles.some((adjacentTileIdx) =>
				$tiles.some((item) => item.tileIndex === adjacentTileIdx)
			)
		);

		const missingTileIndex = Math.round(
			generateSeededRandom(seedFragments[i]) * tilesThatCanBeRemoved.length
		);
		const tileToRemove = tilesThatCanBeRemoved[missingTileIndex];

		if (tileToRemove) {
			const tileIndex = tileToRemove.tileIndex;
			$tiles.forEach(
				(tile) => (tile.adjacentTiles = tile.adjacentTiles.filter((idx) => idx !== tileIndex))
			);
			tiles.set($tiles.filter((tile) => tile.tileIndex !== tileToRemove.tileIndex));
		} else if (i > 0) {
			removeTile(i-1);
		}
	}
</script>

{#each $tiles as tile}
	<GridTile boardPositionY={$boardPositionY} {tile} />
{/each}
