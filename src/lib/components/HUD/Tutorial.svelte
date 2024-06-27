<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '$lib/components/shared/Card.svelte';
	import Button from '$lib/components/shared/Button.svelte';
	import { showTutorial } from '$lib/stores/gameStore';
	import CardTitle from '$lib/components/shared/CardTitle.svelte';

	export let resetCurrentGame: () => void;

	let showPrompt = false;

	$: if ($showTutorial) {
		showPrompt = false;
	}

	onMount(() => {
		if (typeof window !== 'undefined' && window.localStorage) {
			// Check if the user has already seen the tutorial
			const firstTimeHere = localStorage.getItem('firstTimeHere');

			if (!firstTimeHere || firstTimeHere === 'true') {
				showPrompt = true;
			}
		}
	});

	function closeTutorial() {
		showTutorial.set(false);
	}

	function handlePromptYes() {
		showPrompt = false;
		showTutorial.set(true);
		localStorage.setItem('firstTimeHere', 'false');
	}

	function handlePromptNo() {
		showPrompt = false;
		localStorage.setItem('firstTimeHere', 'false');
	}

	function startTutorialMode() {
		resetCurrentGame();
		$showTutorial = false;
	}
</script>

{#if showPrompt}
	<Card>
		<CardTitle>Greetings</CardTitle>
		<div class="prompt__content">
			<p class="prompt__text">Would you like a brief introduction to the game?</p>
		</div>
		<div class="prompt__footer">
			<Button onClick={handlePromptYes}>Yes</Button>
			<Button onClick={handlePromptNo}>No, let me play!</Button>
		</div>
	</Card>
{/if}

{#if $showTutorial}
	<Card>
		<CardTitle>Tutorial</CardTitle>
		<div class="tutorial__content">
			<p class="tutorial__text">Hektaby is a game about placing city zones on optimal tiles and getting as many points as possible!</p>
			<p class="tutorial__text">Are you ready for a guided tour?</p>
		</div>
		<div class="tutorial__footer">
			<Button onClick={startTutorialMode}>Yes, start the tour</Button>
			<Button onClick={closeTutorial}>No, I just want to play!</Button>
		</div>
	</Card>
{/if}

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;
	.prompt {
		&__content {
			color: white;
			padding-bottom: 7.5rem;
		}

		&__text {
			font-family: 'outfit', sans-serif;
			font-size: $text-sm;
			line-height: 1.25;
			margin-bottom: 1.5rem;
		}

		&__footer {
			position: absolute;
			width: 100%;
			bottom: 0;
			left: 0;
			padding: 2rem;
			display: flex;
			flex-flow: column;
			gap: 1rem;
		}
	}

	.tutorial {
		&__content {
			color: white;
			padding-bottom: 7.5rem;
		}

		&__text {
			font-family: 'outfit', sans-serif;
			font-size: $text-sm;
			line-height: 1.25;
			margin-bottom: 1.5rem;
		}

		&__footer {
			position: absolute;
			width: 100%;
			bottom: 0;
			left: 0;
			padding: 2rem;
			display: flex;
			flex-flow: column;
			gap: 1rem;
		}
	}
</style>
