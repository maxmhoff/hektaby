<script lang="ts">
	import { aiSolution, showAIDebugger } from "$lib/stores/gameStore";

    function handleKeyDown(event: KeyboardEvent) {
		if (event.key === '.' && event.ctrlKey) {
			showAIDebugger.update(prev => !prev);
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if $showAIDebugger === true}
    <div class="ai-debugger">
        <p class="ai-debugger__title">AI Debugger</p>
        <button class="ai-debugger__close" on:click={() => (showAIDebugger.set(false))}>&#x2715</button>
        <hr class="ai-debugger__hr" />
        <p class="ai-debugger__item">state: {$aiSolution.state}</p>
        <p class="ai-debugger__item">score: {$aiSolution.score}</p>
        <p class="ai-debugger__item">tileOrder:<br />{$aiSolution.tileOrder.join(', ')}</p>
        <p class="ai-debugger__item">elapsed time: {Math.round($aiSolution.elapsedTime * 100) / 100} seconds</p>
    </div>
{/if}

<style lang="scss">
    @use '$lib/styles/variables.scss' as *;

    .ai-debugger {
        position: fixed;
        width: 320px;
        left: 2rem;
        bottom: 2rem;
        padding: 1rem;
        background-color: $helper-bg;
        border-radius: 1rem;
        color: white;
        user-select: none;

        &__title {
            font-size: $text-md;
            margin-bottom: 1rem;
        }

        &__close {
			position: absolute;
			top: 1rem;
			right: 0.75rem;
			width: fit-content;
			font-size: $text-sm;
			font-weight: 700;
			color: white;
			background-color: transparent;
			border: none;
			cursor: pointer;
			transform-origin: center;
			transition: transform 0.2s ease-in-out;

			&:hover {
				transform: scale(1.3);
			}
		}

		&__hr {
			width: 100%;
			border: none;
			border-bottom: 2px solid white;
		}

        &__item {
            line-height: 2;
            font-size: $text-sm;
        }
    }
</style>