<script lang="ts">
	import { score, tiles, zoneQueue } from '$lib/stores/gameStore';
	import type Tile from '$lib/types/tile';
	import calculateScore from '$lib/utilities/calculate-score';
	import { T } from '@threlte/core';
	import { HTML, interactivity } from '@threlte/extras';
	import { quadInOut, quartOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import GridTileModel from './GridTileModel.svelte';
	import deepCloneArray from '$lib/utilities/deepclone-array';
	import calculateAdjacencyBonus from '$lib/utilities/calculate-adjacency-bonus';

	export let tile: Tile;

	let adjencyBonus: number;
	let color = 'grey';

	const defaultHeight = 0.4;
	const hoverAnimDuration = 400;
	const flipAnimDuration = 600;
	let height = tweened(defaultHeight, { duration: hoverAnimDuration, easing: quartOut });
	let scale = tweened(1, { duration: hoverAnimDuration, easing: quartOut });
	let rotationX = tweened(0, { duration: flipAnimDuration, easing: quadInOut });

	interactivity();

	$: {
		if (tile.state !== 'active') {
			if (tile.tileType === 'default') {
				color = '#CCCCCC';
				rotationX.set(0, { duration: 0 });
			}
			if (tile.tileType === 'residential')
				setTimeout(() => {
					color = '#4fbd4f';
				}, flipAnimDuration * 0.6);
			if (tile.tileType === 'commercial')
				setTimeout(() => {
					color = '#5c9bbf';
				}, flipAnimDuration * 0.6);
			if (tile.tileType === 'industrial')
				setTimeout(() => {
					color = '#9c7c56';
				}, flipAnimDuration * 0.6);
			if (tile.tileType === 'power plant') color = '#666666';
		} else {
			const nextZone = $zoneQueue[$zoneQueue.length - 1];
			if (nextZone === 'residential') color = '#aaf0aa';
			if (nextZone === 'commercial') color = '#a9d1e8';
			if (nextZone === 'industrial') color = '#d4b998';
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
		tile.value = calculateScore(tile);
		const newTiles = deepCloneArray($tiles);
		newTiles.forEach((t) => {
			if (typeof tile.adjacentTiles.find((idx) => idx === t.index) === 'number') {
				return t.state = 'highlight';
			}
			if (t.index === tile.index) {
				return t.state = 'active';
			}
			return t.state = 'default';
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
		newTiles.forEach(t => t.state = 'default');
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

</script>

<T.Group
	scale={$scale}
	rotation.x={tile.tileType !== 'power plant' ? $rotationX : 0}
	position={[tile.position.x, tile.position.y, tile.position.z]}
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
				<p class="tile__score">{tile.value}
				</p>
			</HTML>
		{/if}
		{#if tile.state === 'highlight' && adjencyBonus !== 0}
			<HTML>
				<p class={`tile__adjacency-bonus ${adjencyBonus > 0 ? 'tile__adjacency-bonus--positive' : 'tile__adjacency-bonus--negative'}`}>
					{#if adjencyBonus > 0}<span>+{adjencyBonus}</span>
					{:else}<span>{adjencyBonus}</span>
					{/if}
				</p>
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
	}
</style>
