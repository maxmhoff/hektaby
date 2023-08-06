<script lang="ts">
	import { gameState, score } from '$lib/stores/gameStore';
	import { quadOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	const tweenedScore = tweened(0, { duration: 400, easing: quadOut });
    const tweenedGain = tweened(0, { duration: 400, easing: quadOut})
    let previousScore = 0;
	$: {
        if ($score > 0) {
            tweenedGain.set($score - previousScore, {duration: 0});
            tweenedGain.set(0, {delay: 600});
            tweenedScore.set($score, {delay: 600});
            previousScore = $score;
        } else {
            tweenedScore.set(0, {duration: 0});
            previousScore = 0;
        }
	}
</script>

<div class="score">
    <p class="score__tweened-score">{Math.round($tweenedScore)}</p>
    {#if Math.round($tweenedGain) > 0}
    <p class="score__tweened-gain">+{Math.round($tweenedGain)}</p>
    {/if}
</div>

<style lang="scss">
    @use '$lib/styles/variables.scss' as *;

    .score {
        position: relative;
        width: 4rem;
        
        @media (min-width: $tablet) {
            width: 5rem;
        }

        &__tweened-score {
            width: 100%;
            aspect-ratio: 1 / 1;
            display: grid;
            place-items: center;
            border-radius: 50%;
            border: 4px solid white;
            font-size: $text-md;
            margin-bottom: .25rem;

            @media (min-width: $tablet) {
				font-size: $text-lg;
                margin-bottom: .5rem;
			}
        }

        &__tweened-gain {
            bottom: -1.25rem;
            position: absolute;
            width: 100%;
            text-align: center;
            font-size: $text-sm;
            transform: translateX(-.25ch);

            @media (min-width: $tablet) {
                bottom: -1.5rem;
				font-size: $text-md;
                transform: translateX(-.5ch);
			}
        }
    }
</style>


