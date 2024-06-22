<script lang="ts">
	import { seed } from '$lib/stores/gameStore';
	import '$lib/styles/variables.scss';
	import formatSeed from '$lib/utilities/format-seed';
	import Score from './Score.svelte';
</script>

<div class="status-bar">
	<p class="status-bar__map-title">{formatSeed($seed)}</p>
	<Score />
</div>

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

	.status-bar {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		max-width: $container-max-width;
		justify-content: space-between;
		align-items: center;
        padding: $container-padding-mobile;
		margin-right: auto;
		margin-left: auto;
		color: white;
		pointer-events: none;
		user-select: none;

		@media (min-width: $tablet) {
			padding: $container-padding-desktop;
		}

		&__map-title {
			font-size: $text-md;

			@media (min-width: $tablet) {
				font-size: $text-lg;
			}
		}
	}
</style>
