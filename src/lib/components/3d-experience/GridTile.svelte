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
	const defaultHeight = .4;
	const hoverAnimDuration = 400;
	const flipAnimDuration = 600;
	let positionY = tweened(tile.position.y, {duration: hoverAnimDuration, easing: quartOut});
	let height = tweened(defaultHeight, {duration: hoverAnimDuration, easing: quartOut});
	let scale = tweened(1, {duration: hoverAnimDuration, easing: quartOut});
	let rotationX = tweened(0, {duration: flipAnimDuration, easing: quadInOut});

	interactivity();

	$: {
		if (tile.tileType === 'default') { color = 'lightgrey'; rotationX.set(0, {duration: 0})};
		if (tile.tileType === 'residential') setTimeout(() => {color = '#72d772'}, flipAnimDuration * .75);
		if (tile.tileType === 'commercial') setTimeout(() => {color = '#6ca7c9'}, flipAnimDuration * .75);
		if (tile.tileType === 'industrial') setTimeout(() => {color = '#9c7c56'}, flipAnimDuration * .75);
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
			score.set(calculateScore($tiles));
		}
	}

	function handleEnter() {
		if(tile.tileType === 'default') {
			positionY.set(.2);
			height.set($height + .2);
			scale.set($scale + .04);
		}
	}

	function handleLeave() {
		positionY.set(tile.position.y);
		height.set(defaultHeight);
		scale.set(1);
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
	<T.CylinderGeometry args={[5, 5, $height, 6, 1]} />
	<T.MeshStandardMaterial {color} />
</T.Mesh>
