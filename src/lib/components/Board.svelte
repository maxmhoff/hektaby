<script lang="ts">
	import { currentGame } from '$lib/stores/gameStore';
	import type Tile from '$lib/types/tile';
	import type TileType from '$lib/types/tile-type';
	import calculateScore from '$lib/utilities/calculate-score';
	import shuffleArray from '$lib/utilities/shuffle-array';
	import { onMount } from 'svelte';
	import BoardTile from './BoardTile.svelte';

	let tiles: Tile[];
	let zoneQueue: TileType[];
	let currentZoneQueue: TileType[];
	let gameState: 'In progress' | 'Finished';

	onMount(() => {
		tiles = [];
		zoneQueue = [];
		currentZoneQueue = [];
		gameState = 'In progress';
		initializeGame();
	});

	function initializeGame() {
		tiles = [
			{
				index: 0,
				tileType: 'default',
				position: { x: 0, y: 0 },
				adjacentTiles: [1, 2, 3, 4, 5, 6],
				value: 0
			},
			{
				index: 1,
				tileType: 'default',
				position: { x: 50, y: -90 },
				adjacentTiles: [0, 2, 6, 7, 8, 9],
				value: 0
			},
			{
				index: 2,
				tileType: 'default',
				position: { x: 100, y: 0 },
				adjacentTiles: [0, 1, 3, 9, 10],
				value: 0
			},
			{
				index: 3,
				tileType: 'default',
				position: { x: 50, y: 90 },
				adjacentTiles: [0, 2, 4, 10, 11, 12],
				value: 0
			},
			{
				index: 4,
				tileType: 'default',
				position: { x: -50, y: 90 },
				adjacentTiles: [0, 3, 5, 12, 13, 14],
				value: 0
			},
			{
				index: 5,
				tileType: 'default',
				position: { x: -100, y: 0 },
				adjacentTiles: [0, 4, 6, 14, 15],
				value: 0
			},
			{
				index: 6,
				tileType: 'default',
				position: { x: -50, y: -90 },
				adjacentTiles: [0, 1, 5, 7, 15, 16],
				value: 0
			},
			{
				index: 7,
				tileType: 'default',
				position: { x: 0, y: -180 },
				adjacentTiles: [1, 6, 8, 16],
				value: 0
			},
			{
				index: 8,
				tileType: 'default',
				position: { x: 100, y: -180 },
				adjacentTiles: [1, 7, 9],
				value: 0
			},
			{
				index: 9,
				tileType: 'default',
				position: { x: 150, y: -90 },
				adjacentTiles: [1, 2, 8],
				value: 0
			},
			{
				index: 10,
				tileType: 'default',
				position: { x: 150, y: 90 },
				adjacentTiles: [2, 3, 11],
				value: 0
			},
			{
				index: 11,
				tileType: 'default',
				position: { x: 100, y: 180 },
				adjacentTiles: [3, 10, 12],
				value: 0
			},
			{
				index: 12,
				tileType: 'default',
				position: { x: 0, y: 180 },
				adjacentTiles: [3, 4, 11, 13],
				value: 0
			},
			{
				index: 13,
				tileType: 'default',
				position: { x: -100, y: 180 },
				adjacentTiles: [4, 12, 14],
				value: 0
			},
			{
				index: 14,
				tileType: 'default',
				position: { x: -150, y: 90 },
				adjacentTiles: [4, 5, 13],
				value: 0
			},
			{
				index: 15,
				tileType: 'default',
				position: { x: -150, y: -90 },
				adjacentTiles: [5, 6, 16],
				value: 0
			},
			{
				index: 16,
				tileType: 'default',
				position: { x: -100, y: -180 },
				adjacentTiles: [6, 7, 15],
				value: 0
			}
		];

		const missingTiles = Math.round(Math.random() * 3) + 2;

		for (let i = 0; i < missingTiles; i++) {
			removeTile();
		}

		const specialTileNumber = Math.round(Math.random() * tiles.length);
		tiles[specialTileNumber].tileType = 'power plant';
		createZoneQueue();
		currentZoneQueue = [...zoneQueue];
		currentGame.set({
			score: 0,
			specialZones: 1
		});
	}

	function createZoneQueue() {
		zoneQueue = [];
		const numOfAvailableTiles = tiles.length - $currentGame.specialZones;
		const numOfResidentialTiles = Math.round(Math.random() * (numOfAvailableTiles - 3)) + 1;
		const numOfCommercialTiles =
			Math.round(Math.random() * (numOfAvailableTiles - numOfResidentialTiles - 2)) + 1;
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

		if (tilesThatCanBeRemoved.length === 0) {
			console.log('No more tiles can be removed');
			return;
		}

		const missingTileIndex = Math.round(Math.random() * tilesThatCanBeRemoved.length);
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
			const tileType = currentZoneQueue.pop();
			if (tileType) {
				tiles[idx].tileType = tileType;
				currentZoneQueue = [...currentZoneQueue];
			}
		}
		if (tiles.every((item) => item.tileType !== 'default')) {
			gameState = 'Finished';
		}
		calculateScore(tiles);
		tiles = [...tiles];
	}

	function resetGame() {
		currentZoneQueue = [...zoneQueue];
		currentGame.set({
			score: 0,
			specialZones: 1
		});
		tiles.map((tile) => {
			if (tile.tileType !== 'power plant') tile.tileType = 'default';
		});
		tiles = [...tiles];
	}
</script>

<div class="board">
	<div class="board__info">
		<p class="board__score">Score: {$currentGame.score}</p>
		{#if currentZoneQueue}
			<ul class="board__queue">
				{#each currentZoneQueue as zone, idx}
					<li
						class={`board__queue-item board__queue-item--${zone} ${
							idx === currentZoneQueue.length - 1 ? 'board__queue-item--last' : ''
						}`}
					/>
				{/each}
			</ul>
		{/if}
	</div>
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
		<button class="board__action" on:click={() => initializeGame()}>New game</button>
		<button class="board__action" on:click={() => resetGame()}>Reset</button>
	</div>
</div>

<style lang="scss">
	.board {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		width: 500px;
		height: 700px;
		background-color: white;
		margin-left: auto;
		margin-right: auto;

		&__info {
			padding: 2rem;
			width: 100%;
			display: flex;
			justify-content: space-between;
		}

		&__score {
			width: 70px;
			margin-right: 1rem;
		}

		&__queue {
			display: flex;
			gap: 0.5rem;
		}

		&__queue-item {
			width: 0.75rem;
			height: 2rem;
			background-color: black;

			&--residential {
				background-color: #72d772;
			}

			&--commercial {
				background-color: #6ca7c9;
			}

			&--industrial {
				background-color: #9c7c56;
			}

			&--last {
				width: 3rem;
				height: 3rem;
			}
		}

		&__actions {
			display: flex;
			justify-content: center;
		}

		&__action {
			margin: 0 0.5rem;
		}
	}
</style>
