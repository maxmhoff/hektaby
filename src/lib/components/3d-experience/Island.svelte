<script lang="ts">
	import { T } from '@threlte/core';;
	import { DEG2RAD } from 'three/src/math/MathUtils';
</script>

<T.Mesh rotation.x={DEG2RAD * -90} position.y={-5}>
    <T.PlaneGeometry args={[120, 120, 1, 1]}  />
    <T.MeshStandardMaterial color="grey" />
</T.Mesh>
