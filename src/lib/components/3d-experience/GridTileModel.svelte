<script lang="ts">
	import { T } from '@threlte/core';
	import { GLTF, useGltf } from '@threlte/extras';
	import type { TileType } from '$lib/types/tile';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	export let tileType: TileType;
	export let defaultHeight: number;

	const path = '/3d-models/';

	const house = useGltf(`${path}house.gltf`, { useDraco: true });
	const shop = useGltf(`${path}shop.gltf`, { useDraco: true });
	const factory = useGltf(`${path}factory.gltf`, { useDraco: true });
</script>

<!-- https://gltf.pmnd.rs/ to get scale & rotation of individual meshes -->
{#if tileType === 'residential' && $house}
	<T.Group
		position.y={-defaultHeight}
		scale={0.5}
		rotation.y={DEG2RAD * (-70 + Math.random() * 40)}
		rotation.z={DEG2RAD * 180}
	>
		<T.Mesh
			geometry={$house.nodes.Chimney.geometry}
			material={$house.nodes.Chimney.material}
			rotation={[-Math.PI, 0, -Math.PI]}
			scale={[-0.244, -1.032, -0.244]}
		/>
		<T.Mesh geometry={$house.nodes.Door.geometry} material={$house.nodes.Door.material} />
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
		<T.Mesh geometry={$house.nodes.House.geometry} material={$house.nodes.House.material} />
		<T.Mesh
			geometry={$house.nodes.Roof.geometry}
			material={$house.nodes.Roof.material}
			scale={[2, 1.75, 3.5]}
		/>
		<T.Mesh geometry={$house.nodes.Stairs.geometry} material={$house.nodes.Stairs.material} />
		<T.Mesh geometry={$house.nodes.Windows.geometry} material={$house.nodes.Windows.material} />
		<T.Mesh
			geometry={$house.nodes.Window_Frames.geometry}
			material={$house.nodes.Window_Frames.material}
		/>
	</T.Group>
{/if}

{#if tileType === 'commercial' && $shop}
	<T.Group
		position.y={-defaultHeight}
		scale={0.28}
		rotation.y={DEG2RAD * (110 + Math.random() * 40)}
		rotation.z={DEG2RAD * 180}
	>
		<T.Mesh
			geometry={$shop.nodes.Cloth.geometry}
			material={$shop.nodes.Cloth.material}
			scale={[3.7, 3.4, 6]}
		/>
		<T.Mesh
			geometry={$shop.nodes.Cloth_Alternate.geometry}
			material={$shop.nodes.Cloth_Alternate.material}
			scale={[3.7, 3.4, 6]}
		/>
		<T.Mesh
			geometry={$shop.nodes.Door.geometry}
			material={$shop.nodes.Door.material}
			scale={[0.3, 2.02, 1.2]}
		/>
		<T.Mesh
			geometry={$shop.nodes.House.geometry}
			material={$shop.nodes.House.material}
			scale={[3.7, 3.4, 6]}
		/>
		<T.Mesh
			geometry={$shop.nodes.Roof.geometry}
			material={$shop.nodes.Roof.material}
			scale={[3.93, 1.06, 6.35]}
		/>
	</T.Group>
{/if}

{#if tileType === 'industrial' && $factory}
	<T.Group
		position.y={-defaultHeight}
		scale={0.28}
		rotation.y={DEG2RAD * (110 + Math.random() * 40)}
		rotation.z={DEG2RAD * 180}
	>
		<T.Mesh
			geometry={$factory.nodes.Chimney.geometry}
			material={$factory.nodes.Chimney.material}
			scale={[0.91, 6.65, 1]}
		/>
		<T.Mesh
			geometry={$factory.nodes.Chimney2.geometry}
			material={$factory.nodes.Chimney2.material}
			scale={[0.91, 4.54, 1]}
		/>
		<T.Mesh
			geometry={$factory.nodes.Main.geometry}
			material={$factory.nodes.Main.material}
			scale={[7.5, 3, 4]}
		/>
		<T.Mesh
			geometry={$factory.nodes.Windows.geometry}
			material={$factory.nodes.Windows.material}
			scale={[1.18, 0.57, 0.165]}
		/>
	</T.Group>
{/if}

{#if tileType === 'power plant'}
	<GLTF
		scale={0.6}
		position.x={-.75}
		position.y={defaultHeight}
		position.z={2}

		useDraco
		url={`${path}power-plant.gltf`}
	/>
{/if}
