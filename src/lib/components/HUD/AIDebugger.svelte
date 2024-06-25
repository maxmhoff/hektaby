<script lang="ts">
	import {
		aiSolution,
		difficulties,
		showAIDebugger,
		tiles,
		zoneQueue
	} from '$lib/stores/gameStore';
	import Button from '$lib/components/shared/Button.svelte';
    import loadWorker from '$lib/utilities/load-worker';

	let assessDifficultyWorker: Worker | undefined = undefined;
    
    const customBeamSteps = [1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 75, 100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000, 10000, 15000, 20000, 25000, 50000, 75000, 100000];
    let beamSizeIndex = customBeamSteps.indexOf($aiSolution.beamSize);


	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === '.' && event.ctrlKey) {
			showAIDebugger.update((prev) => !prev);
		}
	}

	function handleBeamSizeChange(event: Event) {
		const target = event.target as HTMLInputElement;
        const index = parseInt(target.value);
        const value = customBeamSteps[index];

		aiSolution.update((solution) => {
			return { ...solution, beamSize: value };
		});
	}

	function handleBeamSizeDoubleClick() {
        beamSizeIndex = customBeamSteps.indexOf(10000);
		aiSolution.update((solution) => {
			return { ...solution, beamSize: 10000 };
		});
	}

    function handleBlueGemPotentialWeightChange(event: Event) {
        const target = event.target as HTMLInputElement;

        aiSolution.update((solution) => {
			return { ...solution, blueGemPotentialWeight: target.value };
		});
    }

    function handleBlueGemPotentialWeightDoubleClick() {
		aiSolution.update((solution) => {
			return { ...solution, blueGemPotentialWeight: 1 };
		});
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if $showAIDebugger === true}
	<div class="ai-debugger">
		<p class="ai-debugger__title">AI Debugger 🤖</p>
		<button class="ai-debugger__close" on:click={() => showAIDebugger.set(false)}>&#x2715</button>
		<hr class="ai-debugger__hr" />
		<p class="ai-debugger__label">Info</p>
		<p class="ai-debugger__item">state: {$aiSolution.state}</p>
		<p class="ai-debugger__item">score: {$aiSolution.score}</p>
		<p class="ai-debugger__item">solution:<br />{$aiSolution.tileOrder.join(', ')}&nbsp;</p>
		<p class="ai-debugger__item">
			elapsed time: {Math.round($aiSolution.elapsedTime * 100) / 100} seconds
		</p>
		<p class="ai-debugger__item">top solutions found: {$aiSolution.numOfHighestScoringStates}</p>
		<hr class="ai-debugger__hr" />
		<p class="ai-debugger__label">Settings</p>
		<p class="ai-debugger__item">beam size: {$aiSolution.beamSize.toLocaleString('en')}</p>
		<input
			class="ai-debugger__range"
			type="range"
            bind:value={beamSizeIndex}
			min={0}
			max={customBeamSteps.length - 1}
			step={1}
			on:input={handleBeamSizeChange}
			on:dblclick={handleBeamSizeDoubleClick}
		/>
        <p class="ai-debugger__item">blue gem potential weight: {$aiSolution.blueGemPotentialWeight}</p>
        <input
			class="ai-debugger__range"
			type="range"
			bind:value={$aiSolution.blueGemPotentialWeight}
			min={0}
			max={2}
			step={0.1}
            on:input={handleBlueGemPotentialWeightChange}
			on:dblclick={handleBlueGemPotentialWeightDoubleClick}
		/>
		<Button disabled={$aiSolution.state === 'loading'} onClick={() => loadWorker($tiles, $zoneQueue, $aiSolution.beamSize, $aiSolution.blueGemPotentialWeight)}
			>{$aiSolution.state === 'ready' ? 'Recompute' : 'Loading'}</Button
		>
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
		background-color: $overlay;
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

		&__label {
			font-family: 'outfit', sans-serif;
			font-size: $text-xs;
			color: #ccc;
			margin-bottom: 0.5rem;
		}

		&__item {
			line-height: 2;
			font-size: $text-sm;
		}

		&__range {
			background-color: white;
			width: 100%;
			height: 0.5rem;
			border-radius: 1rem;
            margin-bottom: .5rem;

            &:last-of-type {
                margin-bottom: 2rem;
            }

			&::-webkit-slider-thumb {
				-webkit-appearance: none;
				width: 1.25rem;
				height: 1.25rem;
				background-color: black;
				border-radius: 50%;
				border: 2px solid white;
				cursor: pointer;
			}

			&::-moz-range-thumb {
				-webkit-appearance: none;
				width: 1.25rem;
				height: 1.25rem;
				background-color: black;
				border-radius: 50%;
				border: 2px solid white;
				cursor: pointer;
			}
		}
	}
</style>
