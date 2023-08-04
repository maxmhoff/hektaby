<script>
	import animationSettings from '$lib/data/animation-settings';
	import { gameState, tiles } from '$lib/stores/gameStore';
	import { T } from '@threlte/core';
	import { tweened } from 'svelte/motion';
	
	const defaultPosition = { x: 0, y: 80, z: 30 };
	const defaultRotationX = -1.1726917666035248;
	const cameraPositionX = tweened(0, animationSettings.gameStart);
	const cameraPositionY = tweened(defaultPosition.y, animationSettings.gameStart);
	const cameraPositionZ = tweened(defaultPosition.z, animationSettings.gameStart);
	const cameraRotationX = tweened(defaultRotationX, animationSettings.gameStart);
	$: {
		if ($gameState === 'finished') {
			cameraPositionY.set(20, animationSettings.gameFinished);
			cameraPositionZ.set(40, animationSettings.gameFinished);
			cameraRotationX.set(-.5, animationSettings.gameFinished);
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
				cameraPositionX.set(tile.position.x / 3, animationSettings.pan);
				cameraPositionZ.set(defaultPosition.z + tile.position.z / 3, animationSettings.pan);
				cameraPositionY.set(defaultPosition.y + tile.position.z / 10, animationSettings.pan);
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
