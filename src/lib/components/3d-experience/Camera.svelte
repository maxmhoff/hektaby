<script>
	import { gameState } from '$lib/stores/gameStore';
	import { T } from '@threlte/core';
	import { linear, quadIn, quadInOut, quadOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	let camera;
	const animDurationFast = 1000;
	const animDurationSlow = 7000;
	const defaultPosition = { x: 0, y: 87, z: 35 };
	const defaultRotationX = -1.1726917666035248;
	const cameraPositionY = tweened(defaultPosition.y, { duration: animDurationFast, easing: quadInOut });
	const cameraPositionZ = tweened(defaultPosition.z, { duration: animDurationFast, easing: quadInOut });
	const cameraRotationX = tweened(defaultRotationX, { duration: animDurationFast, easing: quadInOut });
	$: {
		if ($gameState === 'finished') {
			cameraPositionY.set(20, {duration: animDurationSlow});
			cameraPositionZ.set(40, {duration: animDurationSlow});
			cameraRotationX.set(-.5, {duration: animDurationSlow});
		} else {
			cameraPositionY.set(defaultPosition.y);
			cameraPositionZ.set(defaultPosition.z);
			cameraRotationX.set(defaultRotationX);
		}
	}
</script>

<T.PerspectiveCamera
	makeDefault
	fov={50}
	position.y={$cameraPositionY}
	position.z={$cameraPositionZ}
	rotation.x={$cameraRotationX}
/>
