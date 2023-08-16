<script>
	import { onMount } from 'svelte';

	let showTutorial = false;

	onMount(() => {
		if (typeof window !== 'undefined' && window.localStorage) {
			// Check if the user has already seen the tutorial
			const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');

			if (!hasSeenTutorial || hasSeenTutorial === 'false') {
				showTutorial = true;
			}
		}
	});

	function closeTutorial() {
		// Set the flag in local storage
		localStorage.setItem('hasSeenTutorial', 'true');
		showTutorial = false;
	}
</script>

{#if showTutorial}
	<div class="tutorial">
		<div class="tutorial__content">
			<button on:click={closeTutorial} class="tutorial__close">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M18 6 6 18" /><path d="m6 6 12 12" />
				</svg>
			</button>
			<h3 class="tutorial__title">Welcome to Hexity</h3>
			<div class="tutorial__actions">
				<button on:click={closeTutorial}>Close Tutorial</button>
				<ul class="tutorial__">
					<li />
				</ul>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

	.tutorial {
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: white;
		width: 300px;
		height: 350px;
		border-radius: 1rem;
		transform: translate(-50%, -50%);
		overflow: hidden;

		&__content {
			padding: 1rem;
		}

		&__close {
			display: grid;
			place-items: center;
			width: 2rem;
			height: 2rem;
			float: right;
			background-color: transparent;
			border: none;
			border-radius: 1rem;
			cursor: pointer;

			&:hover {
				box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 5px 0px;
			}
		}

		&__title {
            display: grid;
            place-items: center left;
            height: 2rem;
			font-size: $text-md;
			font-weight: 400;
		}

        &__actions {
            position: absolute;
            bottom: 1rem;
        }
	}
</style>
