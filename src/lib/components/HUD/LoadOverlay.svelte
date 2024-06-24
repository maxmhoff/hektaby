<script lang="ts">
	import { useProgress } from '@threlte/extras';
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	const { progress } = useProgress();
	const tweenedProgress = tweened($progress, {
		duration: 200
	});
	$: tweenedProgress.set($progress);
</script>

{#if $tweenedProgress < 1}
	<div out:fade={{ duration: 200 }} class="load-overlay">
        <h1 class="load-overlay__title">Hektaby</h1>
		<p class="load-overlay__label">Loading 3D assets...</p>
		<div class="load-overlay__bar-wrapper">
			<div class="load-overlay__bar" style={`width: ${$tweenedProgress * 100}%;`} />
		</div>
	</div>
{/if}

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

	.load-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		padding: 2rem;
		background-color: rgb(255, 255, 255);
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;

        &__title {
            position: absolute;
            top: 5rem;
            font-size: $text-xl;
        }

		&__label {
			font-size: $text-sm;
			font-family: 'Outfit', sans-serif;
			margin-bottom: 1rem;
		}

		&__bar-wrapper {
			background-color: lightgray;
			height: 0.5rem;
			width: 100%;
			max-width: 400px;
			margin: 0 auto;
			border-radius: 2rem;
			overflow: hidden;
			margin-bottom: 4rem;
		}
		&__bar {
			background-color: black;
			height: 100%;
			border-radius: 2rem;
		}
	}
</style>
