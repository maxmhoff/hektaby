<script lang="ts">
	import { goto } from "$app/navigation";
	import createSeed from "$lib/utilities/create-seed";
</script>

<p>Frontpage</p>

<button on:click={() => goto(`/${createSeed()}`)}>Start</button>

