<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import type { TileType } from '$lib/types/tile';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	export let tileType: TileType;
	export let defaultHeight: number;

	const path = '/3d-models/';

	const house = useGltf(`${path}house.gltf`, { useDraco: true });
	const shop = useGltf(`${path}shop.gltf`, { useDraco: true });
	const factory = useGltf(`${path}factory.gltf`, { useDraco: true });
	const powerPlant = useGltf(`${path}power-plant.gltf`, { useDraco: true });
	const park = useGltf(`${path}park.gltf`, { useDraco: true });
	const school = useGltf(`${path}school.gltf`, { useDraco: true });
</script>

<!-- https://gltf.pmnd.rs/ to get scale & rotation of individual meshes -->
{#if tileType === 'residential' && $house}
	<T.Group
		position.y={-defaultHeight / 2}
		scale={0.5}
		rotation.y={DEG2RAD * (-70 + Math.random() * 40)}
		rotation.z={DEG2RAD * 180}
	>
		<T.Mesh
			castShadow
			geometry={$house.nodes.Chimney.geometry}
			material={$house.nodes.Chimney.material}
			rotation={[-Math.PI, 0, -Math.PI]}
			scale={[-0.244, -1.032, -0.244]}
		/>
		<T.Mesh
			castShadow
			geometry={$house.nodes.Door.geometry}
			material={$house.nodes.Door.material}
		/>
		<T.Mesh
			castShadow
			geometry={$house.nodes.Door_Handle.geometry}
			material={$house.nodes.Door_Handle.material}
			rotation={[0, 0, -Math.PI / 2]}
			scale={[0.571, 0.511, 0.571]}
		/>
		<T.Mesh
			castShadow
			geometry={$house.nodes.Foundation.geometry}
			material={$house.nodes.Foundation.material}
		/>
		<T.Mesh
			castShadow
			geometry={$house.nodes.House.geometry}
			material={$house.nodes.House.material}
		/>
		<T.Mesh
			castShadow
			geometry={$house.nodes.Roof.geometry}
			material={$house.nodes.Roof.material}
			scale={[2, 1.75, 3.5]}
		/>
		<T.Mesh
			castShadow
			geometry={$house.nodes.Stairs.geometry}
			material={$house.nodes.Stairs.material}
		/>
		<T.Mesh
			castShadow
			geometry={$house.nodes.Windows.geometry}
			material={$house.nodes.Windows.material}
		/>
		<T.Mesh
			castShadow
			geometry={$house.nodes.Window_Frames.geometry}
			material={$house.nodes.Window_Frames.material}
		/>
	</T.Group>
{/if}

{#if tileType === 'commercial' && $shop}
	<T.Group
		position.y={-defaultHeight / 2}
		scale={0.28}
		rotation.y={DEG2RAD * (110 + Math.random() * 40)}
		rotation.z={DEG2RAD * 180}
	>
		<T.Mesh
			castShadow
			geometry={$shop.nodes.Cloth.geometry}
			material={$shop.nodes.Cloth.material}
			scale={[3.7, 3.4, 6]}
		/>
		<T.Mesh
			castShadow
			geometry={$shop.nodes.Cloth_Alternate.geometry}
			material={$shop.nodes.Cloth_Alternate.material}
			scale={[3.7, 3.4, 6]}
		/>
		<T.Mesh
			castShadow
			geometry={$shop.nodes.Door.geometry}
			material={$shop.nodes.Door.material}
			scale={[0.3, 2.02, 1.2]}
		/>
		<T.Mesh
			castShadow
			geometry={$shop.nodes.House.geometry}
			material={$shop.nodes.House.material}
			scale={[3.7, 3.4, 6]}
		/>
		<T.Mesh
			castShadow
			geometry={$shop.nodes.Roof.geometry}
			material={$shop.nodes.Roof.material}
			scale={[3.93, 1.06, 6.35]}
		/>
		<T.Mesh
			castShadow
			geometry={$shop.nodes.Window.geometry}
			material={$shop.nodes.Window.material}
			scale={[3.7, 3.4, 6]}
		/>
	</T.Group>
{/if}

{#if tileType === 'industrial' && $factory}
	<T.Group
		position.y={-defaultHeight / 2}
		scale={0.28}
		rotation.y={DEG2RAD * (110 + Math.random() * 40)}
		rotation.z={DEG2RAD * 180}
	>
		<T.Mesh
			castShadow
			geometry={$factory.nodes.Chimney.geometry}
			material={$factory.nodes.Chimney.material}
			scale={[0.91, 6.65, 1]}
		/>
		<T.Mesh
			castShadow
			geometry={$factory.nodes.Chimney2.geometry}
			material={$factory.nodes.Chimney2.material}
			scale={[0.91, 4.54, 1]}
		/>
		<T.Mesh
			castShadow
			geometry={$factory.nodes.Main.geometry}
			material={$factory.nodes.Main.material}
			scale={[7.5, 3, 4]}
		/>
		<T.Mesh
			castShadow
			geometry={$factory.nodes.Windows.geometry}
			material={$factory.nodes.Windows.material}
			scale={[1.18, 0.57, 0.165]}
		/>
	</T.Group>
{/if}

{#if tileType === 'power plant' && $powerPlant}
	<T.Group
		scale={0.6}
		position.x={1.7}
		position.y={defaultHeight / 2}
		position.z={-0.5}
		rotation.y={DEG2RAD * -60}
	>
		<T.Mesh
			castShadow
			geometry={$powerPlant.nodes.Building.geometry}
			material={$powerPlant.nodes.Building.material}
			position={[1, 2, 0]}
			scale={[3, 2, 2]}
		/>
		<T.Mesh
			castShadow
			geometry={$powerPlant.nodes.Chimney.geometry}
			material={$powerPlant.nodes.Chimney.material}
			position={[0, 4, 6]}
			scale={1.591}
		/>
		<T.Mesh
			castShadow
			geometry={$powerPlant.nodes.Pipe.geometry}
			material={$powerPlant.nodes.Pipe.material}
			position={[0, 1.91, 4.75]}
			rotation={[Math.PI / 2, 0, 0]}
		/>

		<T.Mesh
			castShadow
			geometry={$powerPlant.nodes.Ring.geometry}
			material={$powerPlant.nodes.Ring.material}
			position={[0, 4, 6]}
			scale={1.591}
		/>
		<T.Mesh
			castShadow
			geometry={$powerPlant.nodes.Windows.geometry}
			material={$powerPlant.nodes.Windows.material}
			position={[1, 2, 0]}
			scale={[3, 2, 2]}
		/>
	</T.Group>
{/if}

{#if tileType === 'park' && $park}
	<T.Group position.z={1.2} rotation.y={DEG2RAD * 100} scale={.75}>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Cube001.geometry}
		  material={$park.materials.dark_green}
		  position={[-0.321, 0.998, 0.824]}
		  rotation={[0, -0.35, -0.227]}
		  scale={[0.019, 0.09, 1.541]}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Cube002.geometry}
		  material={$park.materials.dark_green}
		  position={[-0.509, 0.447, 0.778]}
		  rotation={[0, -0.35, -1.707]}
		  scale={[0.02, 0.087, 1.541]}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Cube003.geometry}
		  material={$park.materials.dark_green}
		  position={[0.086, 0.752, -0.448]}
		  rotation={[0, -0.35, -0.233]}
		  scale={[0.01, 0.339, 0.077]}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Cube004.geometry}
		  material={$park.materials.dark_green}
		  position={[-0.174, 0.47, -0.548]}
		  rotation={[0, -0.35, 1.422]}
		  scale={[0.01, 0.231, 0.077]}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Cylinder.geometry}
		  material={$park.materials.steel}
		  position={[-0.025, 0.218, -0.495]}
		  rotation={[0, -0.35, 0]}
		  scale={[0.866, 1, 0.693]}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Cylinder001.geometry}
		  material={$park.materials.steel}
		  position={[-0.945, 0.217, 2.035]}
		  rotation={[0, -0.35, 0]}
		  scale={[0.866, 1, 0.693]}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Cylinder002.geometry}
		  material={$park.materials.steel}
		  position={[-0.458, 0.26, -0.645]}
		  rotation={[0, -0.35, 0]}
		  scale={[0.77, 1.19, 0.616]}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Cylinder003.geometry}
		  material={$park.materials.steel}
		  position={[-1.387, 0.255, 1.883]}
		  rotation={[0, -0.35, 0]}
		  scale={[0.77, 1.184, 0.616]}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Cube.geometry}
		  material={$park.materials.wood}
		  position={[0.87, -0.004, -1.419]}
		  rotation={[Math.PI, -0.248, Math.PI]}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Icosphere.geometry}
		  material={$park.materials.green1}
		  position={[2.717, 5.661, -0.95]}
		  rotation={[2.975, -0.233, 3.029]}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Icosphere001.geometry}
		  material={$park.materials.green2}
		  position={[-0.849, 5.655, -0.343]}
		  rotation={[2.218, -0.799, 1.652]}
		  scale={1.598}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Icosphere002.geometry}
		  material={$park.materials.green2}
		  position={[0.65, 5.644, -2.749]}
		  rotation={[1.61, -1.028, 1.239]}
		  scale={1.257}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Icosphere003.geometry}
		  material={$park.materials.green1}
		  position={[-0.184, 5.63, -2.012]}
		  rotation={[2.064, -0.886, 1.56]}
		  scale={1.388}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Icosphere004.geometry}
		  material={$park.materials.green2}
		  position={[0.891, 6.298, -0.762]}
		  rotation={[1.975, -0.461, 1.035]}
		  scale={1.708}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Icosphere005.geometry}
		  material={$park.materials.green2}
		  position={[1.715, 5.613, -2.005]}
		  rotation={[0.927, -0.83, -1.325]}
		  scale={1.371}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Icosphere007.geometry}
		  material={$park.materials.green1}
		  position={[0.259, 6.164, 0.692]}
		  rotation={[2.119, -1.436, -0.002]}
		  scale={1.396}
		/>
		<T.Mesh
		  castShadow
		  receiveShadow
		  geometry={$park.nodes.Icosphere006.geometry}
		  material={$park.materials.green1}
		  position={[1.97, 5.935, 0.251]}
		  rotation={[-3.019, -1.412, 1.456]}
		  scale={1.409}
		/>
  </T.Group>
{/if}
{#if tileType === 'school' && $school}
<T.Group scale={.3} position.z={1} rotation.y={DEG2RAD * -140} >
	<T.Group position={[-0.584, 3.619, -0.125]} scale={4}>
	  <T.Mesh
		castShadow
		receiveShadow
		geometry={$school.nodes.Cube001.geometry}
		material={$school.materials.Material}
	  />
	  <T.Mesh
		castShadow
		receiveShadow
		geometry={$school.nodes.Cube001_1.geometry}
		material={$school.materials.Glass}
	  />
	  <T.Mesh
		castShadow
		receiveShadow
		geometry={$school.nodes.Cube001_2.geometry}
		material={$school.materials.Wood}
	  />
	  <T.Mesh
		castShadow
		receiveShadow
		geometry={$school.nodes.Cube001_3.geometry}
		material={$school.materials.Roof}
	  />
	  <T.Mesh
		castShadow
		receiveShadow
		geometry={$school.nodes.Cube001_4.geometry}
		material={$school.materials.Stone}
	  />
	</T.Group>
	<T.Mesh
	  castShadow
	  receiveShadow
	  geometry={$school.nodes.Cylinder.geometry}
	  material={$school.nodes.Cylinder.material}
	  position={[5.799, 3.914, -1.089]}
	  rotation={[Math.PI / 2, 0, -Math.PI / 2]}
	  scale={0.1}
	/>
	<T.Group
	  position={[-0.493, 4.074, -6.946]}
	  rotation={[Math.PI / 2, 0, 0]}
	  scale={[2.48, 0.236, 2.48]}>
	  <T.Mesh
		castShadow
		receiveShadow
		geometry={$school.nodes.Cylinder002.geometry}
		material={$school.materials.Wood}
	  />
	  <T.Mesh
		castShadow
		receiveShadow
		geometry={$school.nodes.Cylinder002_1.geometry}
		material={$school.materials.Glass}
	  />
	</T.Group>
	<T.Mesh
	  castShadow
	  receiveShadow
	  geometry={$school.nodes.Cube002.geometry}
	  material={$school.materials.Wood}
	  position={[-0.642, 3.95, -7.168]}
	  scale={[0.16, 2.3, 0.03]}
	/>
	<T.Mesh
	  castShadow
	  receiveShadow
	  geometry={$school.nodes.Cube003.geometry}
	  material={$school.materials.Wood}
	  position={[-0.642, 3.95, -7.168]}
	  rotation={[0.001, 0.005, -1.562]}
	  scale={[0.16, 2.3, 0.03]}
	/>
  </T.Group>
{/if}