<script lang="ts">
	import predefinedTiles from '$lib/data/predefined-tiles';
	import GridTile from '$lib/components/3d-experience/GridTile.svelte';
	import deepCloneArray from '$lib/utilities/deepclone-array';
	import generateSeededRandom from '$lib/utilities/generate-seeded-random';
	import shuffleArray from '$lib/utilities/shuffle-array';
	import type { TileType } from '$lib/types/tile';
	import { gameState, seed, specialZones, tiles, zoneQueue } from '$lib/stores/gameStore';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import animationSettings from '$lib/data/animation-settings';

	let seedFragments: string[] = [];
	const defaultBoardPositionY = 4;
	const boardPositionY = tweened(defaultBoardPositionY, animationSettings.gameFinished);

	$: if ($gameState === 'loading') initializeGrid();
	$: if ($gameState === 'finished') {
		boardPositionY.set(0);
	} else {
		boardPositionY.set(defaultBoardPositionY, animationSettings.gameStart);
	}

	onMount(() => initializeGrid());

	export function initializeGrid() {
		seedFragments = $seed.split('-');
		tiles.set(deepCloneArray(predefinedTiles));

		// Decide how many special zones to add (1 or 2)
		const numOfSpecialZones = Math.round(generateSeededRandom(seedFragments[2]) + 1);

		const missingTiles =
			Math.round(generateSeededRandom(seedFragments[0]) * 2) + (4 - numOfSpecialZones);
		Array.from({ length: missingTiles }, () => removeTile());
		addSpecialZones(numOfSpecialZones);
		zoneQueue.set(createZoneQueue());
		gameState.set('in progress');
	}

	function addSpecialZones(numOfSpecialZones: number) {
		const specialZoneTypes: TileType[] = ['school', 'park', 'power plant'];

		// Filter out tiles that already have a special zone type
		let potentialTiles = $tiles.filter((tile) => !specialZoneTypes.includes(tile.tileType));

		specialZones.set(numOfSpecialZones);

		// Shuffle the special zone types array using seedFragments[1]
		const shuffledSpecialZoneTypes = shuffleArray(specialZoneTypes, seedFragments[1]); // Updated

		for (let i = 0; i < numOfSpecialZones; i++) {
			// Randomly select a tile from the potentialTiles list
			const randomTileIndex = Math.floor(
				generateSeededRandom(seedFragments[2]) * potentialTiles.length
			);
			const selectedTile = potentialTiles[randomTileIndex];

			selectedTile.tileType = shuffledSpecialZoneTypes[i]; // Updated

			// Remove tiles adjacent to the selectedTile from the potentialTiles list
			const adjacentTileIndices = selectedTile.adjacentTiles;
			potentialTiles = potentialTiles.filter(
				(tile) =>
					!adjacentTileIndices.includes(tile.tileIndex) && tile.tileIndex !== selectedTile.tileIndex
			);
		}

		tiles.set($tiles);
	}

	function createZoneQueue(): TileType[] {
		const zoneQueue: TileType[] = [];
		const availableTiles = $tiles.length - $specialZones;
		const seedValue = generateSeededRandom($seed);

		const residentialTiles = Math.round(seedValue * (availableTiles - 6)) + 2;
		const commercialTiles = Math.round(seedValue * (availableTiles - residentialTiles - 4)) + 2;
		const industrialTiles = availableTiles - residentialTiles - commercialTiles;

		zoneQueue.push(...Array(residentialTiles).fill('residential'));
		zoneQueue.push(...Array(commercialTiles).fill('commercial'));
		zoneQueue.push(...Array(industrialTiles).fill('industrial'));

		return shuffleArray(zoneQueue, seedFragments[2]); // Use the return value directly
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
			removeTile(i - 1);
		}
	}
</script>

{#each $tiles as tile}
	<GridTile boardPositionY={$boardPositionY} {tile} />
{/each}