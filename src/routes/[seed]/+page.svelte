<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/components/Game.svelte';
	import { seed } from '$lib/stores/gameStore';
	import LoadOverlay from '$lib/components/HUD/LoadOverlay.svelte';

	export let data: PageData;

	seed.set(data.seed);
</script>

<LoadOverlay />
<Game />
