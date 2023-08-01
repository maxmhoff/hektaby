<script lang="ts">
	import StatusBar from '$lib/components/StatusBar.svelte';
	import { Canvas } from '@threlte/core';
	import type { PageData } from './$types';
	import Camera from '$lib/components/3d-experience/Camera.svelte';
	import Lighting from '$lib/components/3d-experience/Lighting.svelte';
	import HexagonGrid from '$lib/components/3d-experience/HexagonGrid.svelte';

	export let data: PageData;
</script>

<div class="canvas-wrapper">
	<StatusBar seed={data.seed} />
	<Canvas>
		<Camera />
		<Lighting />
		<HexagonGrid seed={data.seed} />
	</Canvas>
</div>

<style lang="scss">
	.canvas-wrapper {
		position: relative;
		margin-top: 2rem;
		margin-left: auto;
		margin-right: auto;
		width: 500px;
		height: 700px;
	}
</style>
