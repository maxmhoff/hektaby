<script lang="ts">
    // icons from https://lucide.dev/
	import type TileType from '$lib/types/tile-type';

	export let tileType: TileType;
</script>

{#if tileType === 'residential'}
	<svg
		class="icon"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
			points="9 22 9 12 15 12 15 22"
		/></svg
	>
{/if}
{#if tileType === 'commercial'}
	<svg
		class="icon"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path
			d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
		/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path
			d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"
		/></svg
	>
{/if}
{#if tileType === 'industrial'}
	<svg
		class="icon"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path
			d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
		/><path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" /></svg
	>
{/if}
{#if tileType === 'power plant'}
	<svg
		class="icon"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path
			d="M12.667 8 10 12h4l-2.667 4"
		/></svg
	>
{/if}

<style lang="scss">
	.icon {
		position: absolute;
		top: calc(50% - 12px);
		left: calc(50% - 12px);
	}
</style>
