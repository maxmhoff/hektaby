<script lang="ts">
	import { Canvas } from '@threlte/core';
	import StatusBar from '../StatusBar.svelte';
	import Camera from '$lib/components/3d-experience/Camera.svelte';
	import Lighting from '$lib/components/3d-experience/Lighting.svelte';
	import HexagonGrid from '$lib/components/3d-experience/HexagonGrid.svelte';
	import { gameState, score, seed, tiles, zoneQueue } from '$lib/stores/gameStore';
	import { goto } from '$app/navigation';
	import createSeed from '$lib/utilities/create-seed';
	import Island from './Island.svelte';
	import Skybox from './Skybox.svelte';

	let dialog: HTMLDialogElement;

	$: if ($zoneQueue.length === 0 && $gameState === 'in progress') {
		gameState.set('finished');
		setTimeout(() => {
			dialog?.showModal();
		}, 400);
	}

	function clearCurrentGame() {
		tiles.set([]);
		score.set(0);
		zoneQueue.set([]);
	}

	function startNewGame() {
		dialog.close();
		clearCurrentGame();
		seed.set(createSeed());
		goto(`/${$seed}`);
		gameState.set('loading');
	}

	function resetCurrentGame() {
		dialog.close();
		clearCurrentGame();
		gameState.set('loading');
	}
</script>

<div class="game">
	<StatusBar />
	<Canvas>
		<Camera />
		<Lighting />
		<Skybox />
		<Island />
		<HexagonGrid />
	</Canvas>
	<dialog class="game__end-dialog" bind:this={dialog}>
		<p class="game__final-score">Your final score was: {$score}</p>
		<button on:click={() => startNewGame()}>New Game</button>
		<button on:click={() => resetCurrentGame()}>Try Again</button>
	</dialog>
</div>

<style lang="scss">
	.game {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		width: 100vw;
		height: 100vh;

		&__end-dialog {
			user-select: none;
		}

		&__final-score {
			margin-bottom: 2rem;
		}
	}
</style>
