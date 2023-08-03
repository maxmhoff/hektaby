<script>
	import { gameState, tiles } from '$lib/stores/gameStore';
	import { T } from '@threlte/core';
	import { linear, quadIn, quadInOut, quadOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	let camera;
	const animDurationFast = 1000;
	const animDurationSlow = 7000;
	const defaultPosition = { x: 0, y: 72, z: 30 };
	const defaultRotationX = -1.1726917666035248;
	const cameraPositionX = tweened(0, { duration: animDurationFast, easing: quadInOut });
	const cameraPositionY = tweened(defaultPosition.y, { duration: animDurationFast, easing: quadInOut });
	const cameraPositionZ = tweened(defaultPosition.z, { duration: animDurationFast, easing: quadInOut });
	const cameraRotationX = tweened(defaultRotationX, { duration: animDurationFast, easing: quadInOut });
	$: {
		if ($gameState === 'finished') {
			cameraPositionY.set(20, {duration: animDurationSlow});
			cameraPositionZ.set(40, {duration: animDurationSlow});
			cameraRotationX.set(-.5, {duration: animDurationSlow});
		} else {
			cameraPositionX.set(0);
			cameraPositionY.set(defaultPosition.y);
			cameraPositionZ.set(defaultPosition.z);
			cameraRotationX.set(defaultRotationX);
		}
	}

	$: {
		$tiles.forEach(tile => {
			if(tile.state === 'active') {
				cameraPositionX.set(tile.position.x / 3, {duration: 600, easing: quadOut});
				cameraPositionZ.set(defaultPosition.z + tile.position.z / 3, {duration: 600, easing: quadOut});
				cameraPositionY.set(defaultPosition.y + tile.position.z / 10, {duration: 600, easing: quadOut});
			}
		})
	}
</script>

<T.PerspectiveCamera
	makeDefault
	fov={50}
	position.x={$cameraPositionX}
	position.y={$cameraPositionY}
	position.z={$cameraPositionZ}
	rotation.x={$cameraRotationX}
/>
