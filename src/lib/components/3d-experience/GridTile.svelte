<script lang="ts">
	import { score, tiles, zoneQueue } from '$lib/stores/gameStore';
	import type Tile from '$lib/types/tile';
	import calculateScore from '$lib/utilities/calculate-score';
	import { T } from '@threlte/core';
	import { HTML, interactivity } from '@threlte/extras';
	import { quadInOut, quartOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { DEG2RAD } from 'three/src/math/MathUtils';

	export let tile: Tile;

	let color = 'grey';
	const defaultHeight = 0.4;
	const hoverAnimDuration = 400;
	const flipAnimDuration = 600;
	let positionY = tweened(tile.position.y, { duration: hoverAnimDuration, easing: quartOut });
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
		if (tile.tileType === 'commercial')
			setTimeout(() => {
				color = '#6ca7c9';
			}, flipAnimDuration * 0.75);
		if (tile.tileType === 'industrial')
			setTimeout(() => {
				color = '#9c7c56';
			}, flipAnimDuration * 0.75);
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
			positionY.set(0.2);
			height.set($height + 0.2);
			scale.set($scale + 0.04);
			if ($zoneQueue[$zoneQueue.length - 1] === 'residential') color = '#aaf0aa';
			if ($zoneQueue[$zoneQueue.length - 1] === 'commercial') color = '#a9d1e8';
			if ($zoneQueue[$zoneQueue.length - 1] === 'industrial') color = '#d4b998';
		}
	}

	function handleLeave() {
		positionY.set(tile.position.y);
		height.set(defaultHeight);
		scale.set(1);
		if (tile.tileType === 'default') color = 'lightgrey';
	}
</script>

<T.Mesh
	scale={$scale}
	rotation.x={$rotationX}
	position={[tile.position.x, $positionY, tile.position.z]}
	on:click={() => handleClick()}
	on:pointerenter={() => handleEnter()}
	on:pointerleave={() => handleLeave()}
>
	<HTML><p class="tile__score">{tile.value}</p></HTML>
	<T.CylinderGeometry args={[5, 5, $height, 6, 1]} />
	<T.MeshStandardMaterial {color} />
</T.Mesh>

<style lang="scss">
	@use '../../styles/variables.scss' as *;

	.tile {
		&__score {
			font-size: $text-sm;
			color: white;
			transform: translate(-50%, -50%);
			pointer-events: none;
		}
	}
</style>