<script lang="ts">
	import type { TileType } from '$lib/types/tile';
	import TileIcon from './TileIcon.svelte';
	export let coordinates: { x: number; y: number } = { x: 0, y: 0 };
	export let tileType: TileType;
	export let tileScore: number = 0;

	let backgroundColor = 'radial-gradient(#b6b6b6, #838383)';
	$: {
		if (tileType === 'default') backgroundColor = 'radial-gradient(#b6b6b6, #838383)';
		if (tileType === 'residential') backgroundColor = '#72d772';
		if (tileType === 'commercial') backgroundColor = '#6ca7c9';
		if (tileType === 'industrial') backgroundColor = '#9c7c56';
        if (tileType === 'power plant') backgroundColor = '#df3e3e';
	}
</script>

<button
	on:click
	class="tile"
	style={`transform: translate(${coordinates.x}px, ${coordinates.y}px); background-color: ${backgroundColor};`}
>
	<div class="tile__content-wrapper">
		<TileIcon tileType={tileType} />
		{#if tileType === 'residential' || tileType === 'commercial' || tileType === 'industrial'}
			<p class="tile__score">
				{tileScore}
			</p>
		{/if}
	</div>
</button>

<style lang="scss">
	.tile {
		$width: 100px;
		$height: 120px;
		width: $width;
		height: $height;
		position: absolute;
		top: calc(50% - ($height / 2));
		left: calc(50% - ($width / 2));
		clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        border: none;
        outline: none;
		&:hover {
			filter: opacity(0.5);
			cursor: pointer;
		}

		&__content-wrapper {
			position: relative;
			width: 100%;
			height: 100%;
			margin: 0;
		}

		&__score {
			position: absolute;
			width: 1.5rem;
			text-align: center;
			margin: 0;
			width: 1.5rem;
			height: 1.5rem;
			top: 65%;
			left: calc(50% - .75rem);
		}
	}
</style>
