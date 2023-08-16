<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/components/Game.svelte';
	import { seed } from '$lib/stores/gameStore';

	export let data: PageData;

	seed.set(data.seed);
</script>

<Game />
