<script lang="ts">
	import Board from '$lib/components/Board.svelte';
	import StatusBar from '$lib/components/StatusBar.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<StatusBar seed={data.seed} />
<Board seed={data.seed} />