<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import type { TileType } from '$lib/types/tile';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	export let tileType: TileType;
	export let defaultHeight: number;

	const house = useGltf('/3d-models/house.gltf', { useDraco: true });
</script>

<!-- https://gltf.pmnd.rs/ to get scale & rotation of individual meshes -->
{#if tileType === 'residential' && $house}
	<T.Group
		position.y={-defaultHeight}
		scale={0.5}
		rotation.y={DEG2RAD * -50}
		rotation.z={DEG2RAD * 180}
	>
		<T.Mesh
			geometry={$house.nodes.Chimney.geometry}
			material={$house.nodes.Chimney.material}
			rotation={[-Math.PI, 0, -Math.PI]}
			scale={[-0.244, -1.032, -0.244]}
		/>
		<T.Mesh
			geometry={$house.nodes.Door.geometry}
			material={$house.nodes.Door.material}
		/>
		<T.Mesh
			geometry={$house.nodes.Door_Handle.geometry}
			material={$house.nodes.Door_Handle.material}
			rotation={[0, 0, -Math.PI / 2]}
			scale={[0.571, 0.511, 0.571]}
		/>
        <T.Mesh
			geometry={$house.nodes.Foundation.geometry}
			material={$house.nodes.Foundation.material}
		/>
		<T.Mesh
			geometry={$house.nodes.House.geometry}
			material={$house.nodes.House.material}
		/>
		<T.Mesh
			geometry={$house.nodes.Roof.geometry}
			material={$house.nodes.Roof.material}
			scale={[2, 1.75, 3.5]}
		/>
        <T.Mesh
			geometry={$house.nodes.Stairs.geometry}
			material={$house.nodes.Stairs.material}
		/>
		<T.Mesh
			geometry={$house.nodes.Windows.geometry}
			material={$house.nodes.Windows.material}
		/>
        <T.Mesh
			geometry={$house.nodes.Window_Frames.geometry}
			material={$house.nodes.Window_Frames.material}
		/>
	</T.Group>
{/if}
