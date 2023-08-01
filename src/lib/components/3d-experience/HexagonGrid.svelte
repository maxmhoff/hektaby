<script lang="ts">
	import predefinedTiles from "$lib/data/predefined-tiles";
	import GridTile from "$lib/components/3d-experience/GridTile.svelte";
	import { onMount } from "svelte";
	import type Tile from "$lib/types/tile";
	import deepCloneArray from "$lib/utilities/deepclone-array";

    export let seed: string;

    let tiles: Tile[] = [];

    onMount(() => initializeGrid())

    function initializeGrid() {
        tiles = deepCloneArray(predefinedTiles);
    }
    
</script>

{#each tiles as tile}
    <GridTile tile={tile} />
{/each}