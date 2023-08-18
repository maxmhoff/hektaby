<script lang="ts">
	import { goto } from '$app/navigation';
	import { scale } from 'svelte/transition';
	import { Canvas } from '@threlte/core';
	import { difficulties, gameState, islandTheme, score, seed, tiles, zoneQueue } from '$lib/stores/gameStore';
	import createSeed from '$lib/utilities/create-seed';
	import { getThemeFromTag } from '$lib/data/island-themes';
	import Camera from '$lib/components/3d-experience/Camera.svelte';
	import HexagonGrid from '$lib/components/3d-experience/HexagonGrid.svelte';
	import Island from '$lib/components/3d-experience/Island.svelte';
	import Lighting from '$lib/components/3d-experience/Lighting.svelte';
	import Skybox from '$lib/components/3d-experience/Skybox.svelte';
	import Star from '$lib/components/HUD/Star.svelte';
	import StatusBar from '$lib/components/HUD/StatusBar.svelte';
	import Water from '$lib/components/3d-experience/Water.svelte';
	import ZoneQueue from '$lib/components/HUD/ZoneQueue.svelte';
	import ThemeEditor from './ThemeEditor.svelte';

	let assessDifficultyWorker: Worker | undefined = undefined;
	let dialog: HTMLDialogElement;
	let isOpen = false;
	let computedSeed = '';

	$: if ($seed !== computedSeed && $gameState === 'in progress') {
		loadWorker();
		computedSeed = $seed;
		const themeName = $seed.split('-')[0];
		const theme = getThemeFromTag(themeName);
		if(themeName && theme) {
			islandTheme.set(theme);
		}
	}

	$: if ($zoneQueue.length === 0 && $gameState === 'in progress') {
		gameState.set('finished');
		setTimeout(() => {
			dialog?.showModal();
			isOpen = true;
		}, 400);
	}

	function clearCurrentGame() {
		gameState.set('loading');
		tiles.set([]);
		score.set(0);
		zoneQueue.set([]);
	}

	function startNewGame() {
		dialog.close();
		isOpen = false;
		clearCurrentGame();
		difficulties.set(undefined);
		seed.set(createSeed());
		goto(`/${$seed}`);
	}

	function resetCurrentGame() {
		dialog.close();
		isOpen = false;
		clearCurrentGame();
	}

	async function loadWorker() {
		const AssessDifficultyWorker = await import('$lib/utilities/assess-difficulty.worker?worker');
		assessDifficultyWorker = new AssessDifficultyWorker.default();
		assessDifficultyWorker.onmessage = onMessage;
		assessDifficultyWorker.postMessage({ predefinedTiles: $tiles, zoneQueue: $zoneQueue });
	}

	function onMessage(event: { data: { easy: number; medium: number; hard: number } }) {
		const { easy, medium, hard } = event.data;
		difficulties.set({ easy, medium, hard });
	}
</script>

<div class="game">
	<StatusBar />
	<Canvas>
		<Camera />
		<Lighting />
		<Skybox />
		<Island />
		<Water />
		<HexagonGrid />
	</Canvas>
	<ZoneQueue />
	<dialog class="game__dialog" bind:this={dialog}>
		<p class="game__final-score">Your final score was: {$score}</p>
		<div class="game__dialog-stars">
			{#if $difficulties && isOpen}
				<span in:scale={{ duration: 300, delay: 100 * 0 + 250 }}>
					<Star hasFill={$score >= $difficulties.easy} />
				</span>
				<span in:scale={{ duration: 300, delay: 100 * 1 + 250 }}>
					<Star hasFill={$score >= $difficulties.medium} />
				</span>
				<span in:scale={{ duration: 300, delay: 100 * 2 + 250 }}>
					<Star hasFill={$score >= $difficulties.hard} />
				</span>
			{:else}
				<p>Loading</p>
			{/if}
		</div>
		<div class="game__dialog-actions">
			<button class="game__dialog-button" on:click={() => startNewGame()}>New Game</button>
			<button class="game__dialog-button" on:click={() => resetCurrentGame()}>Try Again</button>
		</div>
	</dialog>
	<ThemeEditor />
</div>

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

	.game {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		width: 100vw;
		height: 100vh;
		overflow: hidden;

		&__dialog {
			user-select: none;
			background-color: #fffffffe;
			border-radius: 1rem;
			&::backdrop {
				background-color: transparent;
			}
		}

		&__final-score {
			font-size: $text-md;
			margin-bottom: 2rem;
		}

		&__dialog-stars {
			display: flex;
			width: 100%;
			justify-content: space-evenly;
			margin-bottom: 2rem;
		}

		&__dialog-actions {
			display: flex;
			gap: 1rem;
			justify-content: space-between;
		}

		&__dialog-button {
			padding: 0.5rem 2rem;
			border: 2px solid black;
			border-radius: 1rem;
			background: white;
			&:hover,
			&:focus-visible {
				color: white;
				background-color: black;
				cursor: pointer;
			}
		}
	}
</style>
