<script lang="ts">
	import { score, seed } from '$lib/stores/gameStore';
	import '$lib/styles/variables.scss';
	import Score from './Score.svelte';

	function capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function formatSeed(str: string) {
		const seedStringArray = str.split('-');
		return `${capitalize(seedStringArray[0])} ${capitalize(seedStringArray[1])} ${capitalize(
			seedStringArray[2]
		)}`;
	}
</script>

<div class="status-bar">
	<p class="status-bar__map-title">{formatSeed($seed)}</p>
	<Score />
</div>

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

	.status-bar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		max-width: $container-max-width;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: auto;
		margin-left: auto;
        padding: $container-padding;
		color: white;
		pointer-events: none;
		user-select: none;

		&__map-title {
			font-size: $text-md;
			margin-bottom: 1rem;

			@media (min-width: $tablet) {
				font-size: $text-lg;
			}
		}

		&__score {
			font-size: $text-sm;
		}
	}
</style>
