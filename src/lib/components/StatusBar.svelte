<script lang="ts">
	import { score, seed, zoneQueue } from '$lib/stores/gameStore';
	import '$lib/styles/variables.scss';
	import TileIcon from './TileIcon.svelte';

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
	<p class="status-bar__title">{formatSeed($seed)}</p>
	<div class="status-bar__row">
		<p class="status-bar__score">{$score}</p>
		{#if $zoneQueue}
			<ul class="status-bar__queue">
				{#each $zoneQueue as zone, idx}
					<li
						class={`status-bar__queue-item status-bar__queue-item--${zone} ${
							idx === $zoneQueue.length - 1 ? 'status-bar__queue-item--last' : ''
						}`}
					>
						{#if idx === $zoneQueue.length - 1}
							<TileIcon tileType={zone} />
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '../styles/variables.scss' as *;

	.status-bar {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		margin-top: 2rem;
        padding: 0 1rem;
		pointer-events: none;
		user-select: none;

		&__title {
			font-size: $text-lg;
			margin-bottom: 1rem;
		}

        &__row {
            display: flex;
            height: 100px;
            justify-content: space-between;
            align-items: center;
        }

		&__queue {
			display: flex;
			gap: 0.4rem;
		}

		&__queue-item {
			position: relative;
			width: 0.5rem;
			height: 2rem;
			margin-top: 1.4rem;
			background-color: black;

			&--residential {
				background-color: #72d772;
			}

			&--commercial {
				background-color: #6ca7c9;
			}

			&--industrial {
				background-color: #9c7c56;
			}

			&--last {
				width: 4rem;
				height: 4.8rem;
				margin-top: 0;
				clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
			}
		}

		&__score {
			font-size: $text-sm;
		}
	}
</style>
