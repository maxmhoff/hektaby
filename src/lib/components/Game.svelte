<script lang="ts">
	import { goto } from '$app/navigation';
	import { scale } from 'svelte/transition';
	import { Canvas } from '@threlte/core';
	import { aiSolution, difficulties, gameState, islandTheme, score, seed, specialZones, tiles, zoneQueue } from '$lib/stores/gameStore';
	import createSeed from '$lib/utilities/create-seed';
	import formatSeed from '$lib/utilities/format-seed';
	import loadWorker from '$lib/utilities/load-worker';
	import { getThemeFromTag } from '$lib/data/island-themes';
	import Camera from '$lib/components/3d-experience/Camera.svelte';
	import HexagonGrid from '$lib/components/3d-experience/HexagonGrid.svelte';
	import Island from '$lib/components/3d-experience/Island.svelte';
	import Lighting from '$lib/components/3d-experience/Lighting.svelte';
	import Skybox from '$lib/components/3d-experience/Skybox.svelte';
	import Water from '$lib/components/3d-experience/Water.svelte';
	import StatusBar from '$lib/components/HUD/StatusBar.svelte';
	import ZoneQueue from '$lib/components/HUD/ZoneQueue.svelte';
	import AIDebugger from '$lib/components/HUD/AIDebugger.svelte';
	import ThemeEditor from '$lib/components/HUD/ThemeEditor.svelte';
	import Star from '$lib/components/shared/Star.svelte';
	import Button from '$lib/components/shared/Button.svelte';

	let assessDifficultyWorker: Worker | undefined = undefined;
	let isOpen = false;
	let animateStars = false;
	let computedSeed = '';

	$: if ($seed !== computedSeed && $gameState === 'in progress') {
		loadWorker($tiles, $zoneQueue, $aiSolution.beamSize, $aiSolution.blueGemPotentialWeight);
		computedSeed = $seed;
		const themeName = $seed.split('-')[0];
		const theme = getThemeFromTag(themeName);
		if (theme) {
			islandTheme.set(theme);
		}
	}

	$: if ($zoneQueue.length === 0 && $gameState === 'in progress') {
		gameState.set('finished');
		setTimeout(() => {
			isOpen = true;
			setTimeout(() => {
				animateStars = true;
			}, 0);
		}, 400);
	}

	function clearCurrentGame() {
		gameState.set('loading');
		tiles.set([]);
		score.set(0);
		zoneQueue.set([]);
	}

	function startNewGame() {
		isOpen = false;
		animateStars = false;
		clearCurrentGame();
		difficulties.set(undefined);
		specialZones.set(0);
		seed.set(createSeed());
		goto(`/${$seed}`);
	}

	function resetCurrentGame() {
		isOpen = false;
		animateStars = false;
		clearCurrentGame();
	}

	async function share() {
		let stars = '';
		if ($difficulties) {
			stars = `${$score >= $difficulties.easy ? '⭐' : ''}${$score >= $difficulties.medium ? '⭐' : ''}${$score >= $difficulties.hard ? '⭐' : ''}`
		}
		const textToCopy = `I scored ${$score} points${stars ? ` (${stars})` : ''} on ${formatSeed($seed)}! Can you beat me? Play now: ${window.location.href}`;
		try {
			await navigator.clipboard.writeText(textToCopy);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
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
	{#if isOpen}
		<div class="game__endscreen">
			<p class="game__final-score">Final score: {$score}</p>
			<div class="game__endscreen-stars">
				{#if $difficulties && animateStars}
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
			<div class="game__endscreen-actions">
				<Button onClick={resetCurrentGame}>Try Again</Button>
				<Button onClick={startNewGame}>New Island</Button>
				<Button onClick={share}>Share</Button>
			</div>
		</div>
	{/if}
	<ThemeEditor />
	<AIDebugger />
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

		&__endscreen {
			position: absolute;
			inset: 0;
			margin: auto;
			width: 340px;
			height: 394px;
			padding: 2rem;
			background-color: $overlay;
			border-radius: 1rem;
			border: none;
			user-select: none;
			z-index: 1;
			@media (min-width: $tablet) {
				width: 360px;
			}
		}

		&__final-score {
			font-size: $text-md;
			color: white;
			letter-spacing: .125rem;
			margin-bottom: 2rem;
		}

		&__endscreen-stars {
			display: flex;
			width: 100%;
			justify-content: space-evenly;
			margin-bottom: 2rem;
		}

		&__endscreen-actions {
			display: flex;
			flex-flow: column;
			gap: 1rem;
			justify-content: space-between;
		}
	}
</style>
