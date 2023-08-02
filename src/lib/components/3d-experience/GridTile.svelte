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

	export let tile: Tile;

	let model: string;

	let color = 'grey';
	const defaultHeight = 0.4;
	const hoverAnimDuration = 400;
	const flipAnimDuration = 600;
	let height = tweened(defaultHeight, { duration: hoverAnimDuration, easing: quartOut });
	let scale = tweened(1, { duration: hoverAnimDuration, easing: quartOut });
	let rotationX = tweened(0, { duration: flipAnimDuration, easing: quadInOut });

	interactivity();

	$: {
		if (tile.tileType === 'default') {
			color = 'lightgrey';
			rotationX.set(0, { duration: 0 });
		}
		if (tile.tileType === 'residential')
			setTimeout(() => {
				color = '#72d772';
			}, flipAnimDuration * 0.75);
		model = '3d-models/testmodel.gltf';
		if (tile.tileType === 'commercial')
			setTimeout(() => {
				color = '#6ca7c9';
			}, flipAnimDuration * 0.75);
		if (tile.tileType === 'industrial')
			setTimeout(() => {
				color = '#9c7c56';
			}, flipAnimDuration * 0.75);
		model = '3d-models/testmodel2.gltf';
		if (tile.tileType === 'power plant') color = '#df3e3e';
	}

	function handleClick() {
		if (tile.tileType === 'default') {
			const tempZoneQueue = $zoneQueue;
			const nextZone = tempZoneQueue.pop();
			if (nextZone) {
				tile.tileType = nextZone;
				zoneQueue.set(tempZoneQueue);
				rotationX.set($rotationX + DEG2RAD * 180);
			}
			const calcObject = calculateScore($tiles);
			score.set(calcObject.score);
			tiles.set(calcObject.updatedTiles);
		}
	}

	function handleEnter() {
		if (tile.tileType === 'default') {
			height.set($height + 0.4);
			scale.set($scale + 0.04);
			if ($zoneQueue[$zoneQueue.length - 1] === 'residential') color = '#aaf0aa';
			if ($zoneQueue[$zoneQueue.length - 1] === 'commercial') color = '#a9d1e8';
			if ($zoneQueue[$zoneQueue.length - 1] === 'industrial') color = '#d4b998';
		}
	}

	function handleLeave() {
		height.set(defaultHeight);
		scale.set(1);
		if (tile.tileType === 'default') color = 'lightgrey';
	}
</script>

<T.Group
	scale={$scale}
	rotation.x={$rotationX}
	position={[tile.position.x, tile.position.y, tile.position.z]}
>
	<T.Mesh
		on:click={() => handleClick()}
		on:pointerenter={() => handleEnter()}
		on:pointerleave={() => handleLeave()}
	>
		{#if tile.tileType !== 'power plant' && tile.tileType !== 'default'}<HTML
				><p class="tile__score">{tile.value}</p></HTML
			>{/if}
		<T.CylinderGeometry args={[5, 5, $height, 6, 1]} />
		<T.MeshStandardMaterial {color} />
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
	}
</style>
