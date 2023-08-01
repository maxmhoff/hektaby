<script lang="ts">
	import { score, tiles, zoneQueue } from '$lib/stores/gameStore';
	import type Tile from '$lib/types/tile';
	import calculateScore from '$lib/utilities/calculate-score';
	import { T } from '@threlte/core'
    import { interactivity } from '@threlte/extras'
    
	export let tile: Tile;

	let color = 'grey';

	interactivity();

	$: {
		if (tile.tileType === 'default') color = 'lightgrey';
		if (tile.tileType === 'residential') color = '#72d772';
		if (tile.tileType === 'commercial') color = '#6ca7c9';
		if (tile.tileType === 'industrial') color = '#9c7c56';
		if (tile.tileType === 'power plant') color = '#df3e3e';
	}

	function handleClick() {
		if(tile.tileType === 'default') {
			const tempZoneQueue = $zoneQueue
			const nextZone = tempZoneQueue.pop()
			if (nextZone) {
				tile.tileType = nextZone;
				zoneQueue.set(tempZoneQueue);
			}
			score.set(calculateScore($tiles));
		}
	}
</script>


<T.Mesh position={[tile.position.x, tile.position.y, tile.position.z]} on:click={() => handleClick()}>
    <T.CylinderGeometry args={[5, 5, 0.4, 6, 1]} />
    <T.MeshStandardMaterial {color} />
</T.Mesh>

