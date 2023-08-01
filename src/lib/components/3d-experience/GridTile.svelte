<script lang="ts">
	import type Tile from '$lib/types/tile';
	import { T } from '@threlte/core'
    import { interactivity } from '@threlte/extras'
    
	export let tile: Tile;
    interactivity();

	let color = 'grey';

	$: {
		if (tile.tileType === 'default') color = 'lightgrey';
		if (tile.tileType === 'residential') color = '#72d772';
		if (tile.tileType === 'commercial') color = '#6ca7c9';
		if (tile.tileType === 'industrial') color = '#9c7c56';
		if (tile.tileType === 'power plant') color = '#df3e3e';
	}
</script>


<T.Mesh position={[...tile.position]} on:click={() => console.log('click')}>
    <T.CylinderGeometry args={[5, 5, 0.4, 6]} />
    <T.MeshStandardMaterial {color} />
</T.Mesh>

