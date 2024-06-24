<script lang="ts">
	import { T } from '@threlte/core';
</script>

<T.AmbientLight intensity={1.5} />
<T.DirectionalLight
	position={[-2, 16, 10]}
	intensity={2.2}
	castShadow
	shadow.camera.top={22}
	shadow.camera.right={22}
	shadow.camera.bottom={-22}
	shadow.camera.left={-22}
	shadow.mapSize.width={2048}
	shadow.mapSize.height={2048}
	shadow.bias={-0.001}
/>
