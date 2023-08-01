<script lang="ts">
	import { currentGame } from '$lib/stores/gameStore';
	import type Tile from '$lib/types/tile';
	import calculateScore from '$lib/utilities/calculate-score';
	import shuffleArray from '$lib/utilities/shuffle-array';
	import { onMount } from 'svelte';
	import BoardTile from './BoardTile.svelte';
	import type { TileType } from '$lib/types/tile';
	import generateSeededRandom from '$lib/utilities/generate-seeded-random';
	import { goto } from '$app/navigation';
	import createSeed from '$lib/utilities/create-seed';
	import predefinedTiles from '$lib/data/predefined-tiles';
	import deepCloneArray from '$lib/utilities/deepclone-array';

	export let seed: string;
	let tiles: Tile[];
	let zoneQueue: TileType[];
	let gameState: 'in progress' | 'finished';
	let endDialog: HTMLDialogElement;
	let seedStringArray: string[];

	onMount(() => {
		clearCurrentGame();
		initializeGame();
	});

	function clearCurrentGame() {
		tiles = [];
		zoneQueue = [];
		gameState = 'in progress';
	}

	function initializeGame() {
		seedStringArray = seed.split('-');
		endDialog.close();
		tiles = deepCloneArray(predefinedTiles);

		const missingTiles = Math.round(generateSeededRandom(seedStringArray[0]) * 3) + 2;

		for (let i = 0; i < missingTiles; i++) {
			removeTile();
		}

		const specialTileNumber = Math.round(generateSeededRandom(seedStringArray[1]) * (tiles.length - 1));
		tiles[specialTileNumber].tileType = 'power plant';
		createZoneQueue();
		currentGame.set({
			score: 0,
			specialZones: 1,
			zoneQueue: [...zoneQueue],
		});
		gameState = 'in progress';
	}

	function createZoneQueue() {
		zoneQueue = [];
		const numOfAvailableTiles = tiles.length - $currentGame.specialZones;
		const numOfResidentialTiles = Math.round(generateSeededRandom(seedStringArray[1]) * (numOfAvailableTiles - 3)) + 1;
		const numOfCommercialTiles =
			Math.round(generateSeededRandom(seedStringArray[1]) * (numOfAvailableTiles - numOfResidentialTiles - 2)) + 1;
		const numOfIndustrialTiles = numOfAvailableTiles - numOfResidentialTiles - numOfCommercialTiles;
		for (let i = 0; i < numOfResidentialTiles; i++) {
			zoneQueue.push('residential');
		}

		for (let i = 0; i < numOfCommercialTiles; i++) {
			zoneQueue.push('commercial');
		}

		for (let i = 0; i < numOfIndustrialTiles; i++) {
			zoneQueue.push('industrial');
		}

		shuffleArray(zoneQueue);
	}

	function removeTile() {
		const tilesThatCanBeRemoved = tiles.filter((tile) =>
			tile.adjacentTiles.every((adjacentTileIdx) => {
				const adjacentTile = tiles.find((item) => item.index === adjacentTileIdx);
				return (
					adjacentTile && adjacentTile.adjacentTiles.filter((idx) => idx !== tile.index).length >= 1
				);
			})
		);

		const missingTileIndex = Math.round(generateSeededRandom(seedStringArray[2]) * tilesThatCanBeRemoved.length);
		const tileToRemove = tilesThatCanBeRemoved[missingTileIndex];

		if (tileToRemove) {
			const tileIndex = tileToRemove.index;
			for (let tile of tiles) {
				tile.adjacentTiles = tile.adjacentTiles.filter((idx) => idx !== tileIndex);
			}
			tiles = tiles.filter((tile) => tile.index !== tileToRemove.index);
		} else {
			removeTile();
		}
	}

	function handleClick(idx: number) {
		if (tiles[idx].tileType === 'default') {
			const currentZoneQueue = $currentGame.zoneQueue;
			const tileType = currentZoneQueue.pop();
			currentGame.set({score: $currentGame.score, specialZones: 1, zoneQueue: currentZoneQueue});
			if (tileType) {
				tiles[idx].tileType = tileType;
			}
		}
		if (tiles.every((item) => item.tileType !== 'default')) {
			gameState = 'finished';
			endDialog.showModal();
		}
		currentGame.set({score: calculateScore(tiles), specialZones: 1, zoneQueue: $currentGame.zoneQueue});

		tiles = [...tiles];
	}

	function resetGame() {
		endDialog.close();
		currentGame.set({
			score: 0,
			specialZones: 1,
			zoneQueue: [...zoneQueue],
		});
		tiles.map((tile) => {
			if (tile.tileType !== 'power plant') tile.tileType = 'default';
		});
		tiles = [...tiles];
		gameState = 'in progress'
	}

	function startNewGame() {
		clearCurrentGame();
		seed = createSeed();
		initializeGame();
		setTimeout(() => goto(`/${seed}`), 0);
	}
</script>

<div class="board">
	{#if tiles}
		{#each tiles as tile, idx}
			<BoardTile
				on:click={() => handleClick(idx)}
				tileType={tile.tileType}
				coordinates={tile.position}
				tileScore={tile.value}
			/>
		{/each}
	{/if}
	<div class="board__actions">
		
	</div>
	<dialog bind:this={endDialog} class="board__dialog">
		<p>Your final score was: {$currentGame.score}</p>
		<button class="board__action" on:click={() => startNewGame()}>New game</button>
		<button class="board__action" on:click={() => resetGame()}>Try again</button>
	</dialog>
</div>

<style lang="scss">
	.board {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		width: 500px;
		height: 500px;
		background-color: white;
		margin-left: auto;
		margin-right: auto;

		&__actions {
			display: flex;
			justify-content: center;
		}

		&__action {
			margin: 0 0.5rem;
		}
	}
</style>
