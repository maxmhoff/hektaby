<script>
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { T } from '@threlte/core';
	import { islandThemeColors } from '$lib/stores/gameStore';
</script>

<T.Mesh rotation.x={DEG2RAD * -90}>
	<T.CircleGeometry args={[35, 64, 0, 360 * DEG2RAD]} />
	<T.MeshStandardMaterial color={$islandThemeColors.islandColor} />
</T.Mesh>
