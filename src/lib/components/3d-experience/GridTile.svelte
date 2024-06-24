<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { T } from '@threlte/core';
	import { HTML, interactivity } from '@threlte/extras';
	import { score, showAIDebugger, tiles, zoneQueue } from '$lib/stores/gameStore';
	import calculateScore from '$lib/utilities/calculate-score';
	import GridTileModel from './GridTileModel.svelte';
	import deepCloneArray from '$lib/utilities/deepclone-array';
	import calculateAdjacencyBonus from '$lib/utilities/calculate-adjacency-bonus';
	import zoneColors from '$lib/data/zone-colors';
	import animationSettings from '$lib/data/animation-settings';
	import type Tile from '$lib/types/tile';

	export let tile: Tile;
	export let boardPositionY: number;

	let adjencyBonus: number;
	let color = 'grey';
	let showIndex = false;

	const defaultHeight = 0.4;
	let height = tweened(defaultHeight, animationSettings.hover);
	let scale = tweened(1, animationSettings.hover);
	let rotationX = tweened(0, animationSettings.flipTile);
	interactivity();

	$: {
		if (tile.state !== 'active') {
			if (tile.tileType === 'default') {
				color = zoneColors.default.base;
				rotationX.set(0, { duration: 0 });
			}
			if (tile.tileType === 'residential')
				setTimeout(() => {
					color = zoneColors.residential.base;
				}, animationSettings.flipTile.duration * 0.6);
			if (tile.tileType === 'commercial')
				setTimeout(() => {
					color = zoneColors.commercial.base;
				}, animationSettings.flipTile.duration * 0.6);
			if (tile.tileType === 'industrial')
				setTimeout(() => {
					color = zoneColors.industrial.base;
				}, animationSettings.flipTile.duration * 0.6);
			if (tile.tileType === 'park')
				color = zoneColors.park.base;
			if (tile.tileType === 'power plant')
				color = zoneColors.powerplant.base;
			if (tile.tileType === 'school')
				color = zoneColors.school.base;
		} else {
			const nextZone = $zoneQueue[$zoneQueue.length - 1];
			if (nextZone === 'residential') color = zoneColors.residential.selected;
			if (nextZone === 'commercial') color = zoneColors.commercial.selected;
			if (nextZone === 'industrial') color = zoneColors.industrial.selected;
		}
		if (tile.state === 'highlight') {
			updateAdjacencyBonus();
		}
	}

	function handleClick() {
		if (tile.tileType === 'default') {
			if (tile.state !== 'active') {
				return activateTile();
			}
			applyZone();
		}
	}

	function activateTile() {
		tile.value = calculateScore($tiles, {
			...tile,
			tileType: $zoneQueue[$zoneQueue.length - 1]
		});
		const newTiles = deepCloneArray($tiles);
		newTiles.forEach((t) => {
			if (typeof tile.adjacentTiles.find((idx) => idx === t.tileIndex) === 'number') {
				return (t.state = 'highlight');
			}
			if (t.tileIndex === tile.tileIndex) {
				return (t.state = 'active');
			}
			return (t.state = 'default');
		});
		tiles.set(newTiles);
	}

	function applyZone() {
		const tempZoneQueue = $zoneQueue;
		const nextZone = tempZoneQueue.pop();
		if (nextZone) {
			tile.tileType = nextZone;
			zoneQueue.set(tempZoneQueue);
			rotationX.set($rotationX + DEG2RAD * 180);
		}

		const newTiles = deepCloneArray($tiles);
		newTiles.forEach((t) => (t.state = 'default'));
		tiles.set(newTiles);

		score.set($score + tile.value);
	}

	function handleEnter() {
		if (tile.tileType === 'default') {
			height.set($height + 0.4);
			scale.set($scale + 0.04);
		}
	}

	function handleLeave() {
		height.set(defaultHeight);
		scale.set(1);
	}

	function updateAdjacencyBonus() {
		adjencyBonus = calculateAdjacencyBonus(tile);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === '.' && event.ctrlKey) {
			showIndex = !showIndex;
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<T.Group
	scale={$scale}
	rotation.x={!['power plant', 'school', 'park'].includes(tile.tileType) ? $rotationX : 0}
	position={[tile.position.x, boardPositionY + $height / 2, tile.position.z]}
>
	<T.Mesh
		receiveShadow
		on:click={() => handleClick()}
		on:pointerenter={() => handleEnter()}
		on:pointerleave={() => handleLeave()}
	>
		<T.CylinderGeometry args={[5, 5, $height, 6, 1]} />
		<T.MeshStandardMaterial {color} />
		{#if tile.state === 'active'}
			<HTML>
				<p class="tile__score">{tile.value}</p>
			</HTML>
		{/if}
		{#if tile.state === 'highlight' && adjencyBonus !== 0}
			<HTML>
				<p
					class={`tile__adjacency-bonus ${
						adjencyBonus > 0 ? 'tile__adjacency-bonus--positive' : 'tile__adjacency-bonus--negative'
					}`}
				>
					{#if adjencyBonus > 0}+{adjencyBonus}
					{:else}{adjencyBonus}
					{/if}
				</p>
			</HTML>
		{/if}
		{#if $showAIDebugger}

			<HTML>
				<p class="tile__tile-index">{tile.tileIndex}</p>
			</HTML>
		{/if}
	</T.Mesh>

	<GridTileModel tileType={tile.tileType} {defaultHeight} />
</T.Group>

<style lang="scss">
	@use '../../styles/variables.scss' as *;

	.tile {
		&__score {
			position: absolute;
			font-size: $text-md;
			color: white;
			transform: translate(-50%, -50%);
			pointer-events: none;
			user-select: none;
		}

		&__adjacency-bonus {
			position: absolute;
			font-size: $text-md;
			color: white;
			transform: translate(-50%, -50%);
			pointer-events: none;
			user-select: none;
		}

		&__tile-index {
			position: absolute;
			font-size: $text-sm;
			color: #aaa;
			transform: translate(-50%, 75%);
			pointer-events: none;
			user-select: none;
		}
	}
</style>
