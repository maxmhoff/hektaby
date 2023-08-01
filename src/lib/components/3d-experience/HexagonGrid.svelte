<script lang="ts">
	import predefinedTiles from "$lib/data/predefined-tiles";
	import GridTile from "$lib/components/3d-experience/GridTile.svelte";

    export let seed: string;
    
</script>

{#each predefinedTiles as tile}
    <GridTile tile={tile} />
{/each}