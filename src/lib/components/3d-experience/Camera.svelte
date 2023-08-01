<script>
	import { OrbitControls } from '@threlte/extras';
	import { T } from '@threlte/core';
</script>


<T.PerspectiveCamera makeDefault fov={50} position={[0, 40, 60]}>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>
