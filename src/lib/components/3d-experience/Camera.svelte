<script>
	import { T } from '@threlte/core';
</script>

<T.PerspectiveCamera
	makeDefault
	fov={50}
	position.y={87}
	position.z={35}
	on:create={({ ref }) => {
		ref.lookAt(0, -20, -10);
	}}
/>
