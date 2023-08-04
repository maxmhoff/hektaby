<script lang="ts">
	import { T } from '@threlte/core';
	import { DEG2RAD } from 'three/src/math/MathUtils';
</script>

<T.Mesh rotation.x={DEG2RAD * -90} position.y={0}>
    <T.CircleGeometry args={[40, 64, 0, 360 * DEG2RAD]}  />
    <T.MeshStandardMaterial color="#30914c" />
</T.Mesh>
<T.Mesh rotation.x={DEG2RAD * -90} position.y={0}>
    <T.RingGeometry args={[40, 63, 64, 360 * DEG2RAD]} />
    <T.MeshStandardMaterial color="#4a9db0" />
</T.Mesh>
