<script lang="ts">
	import type { PageData } from './$types';
	import Game from '$lib/components/3d-experience/Game.svelte';
	import { seed } from '$lib/stores/gameStore';

	export let data: PageData;

	seed.set(data.seed);
</script>

<Game />
