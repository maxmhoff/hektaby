<script lang="ts">
	import { T } from '@threlte/core';
</script>

<T.AmbientLight intensity={0.6} />
<T.DirectionalLight
	position={[0, 14, 10]}
	intensity={.8}
	castShadow
	shadow.camera.top={22}
	shadow.camera.right={22}
	shadow.camera.bottom={-22}
	shadow.camera.left={-22}
/>
