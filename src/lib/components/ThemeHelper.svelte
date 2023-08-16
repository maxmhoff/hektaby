<script lang="ts">
	import { gameState, islandThemeColors } from '$lib/stores/gameStore';

	let isActive = false;
	let seedThemeLoaded = false;

	let islandColor: string;
	let skyColorOne: string;
	let skyColorTwo: string;
	let waterColorOne: string;
	let waterColorTwo: string;

    function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'T' && event.shiftKey) {
			isActive = !isActive;
		}
	}

	function updateIslandTheme() {
		islandThemeColors.set({
			islandColor,
			skyColorOne,
			skyColorTwo,
			waterColorOne,
			waterColorTwo
		});
	}

	$: {
		if ($gameState === 'in progress' && !seedThemeLoaded) {
			islandColor = $islandThemeColors.islandColor;
			skyColorOne = $islandThemeColors.skyColorOne;
			skyColorTwo = $islandThemeColors.skyColorTwo;
			waterColorOne = $islandThemeColors.waterColorOne;
			waterColorTwo = $islandThemeColors.waterColorTwo;
			seedThemeLoaded = true;
		} else if ($gameState === 'loading') {
			seedThemeLoaded = false;
		}
	}

	function copy() {
		let valueToCopy = `colors: {
            islandColor: '${islandColor}',
            skyColorOne: '${skyColorOne}',
            skyColorTwo: '${skyColorTwo}',
            waterColorOne: '${waterColorOne}',
            waterColorTwo: '${waterColorTwo}',
        }`;

		navigator.clipboard
			.writeText(valueToCopy)
			.then(() => {
				console.log('Copied to clipboard!');
			})
			.catch((err) => {
				console.error('Failed to copy!', err);
			});
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if isActive}
	<div class="theme-helper">
		<div class="theme-helper__field">
			<label class="theme-helper__label" for="islandColor">Island Color</label>
			<input
				bind:value={islandColor}
				on:input={() => updateIslandTheme()}
				class="theme-helper__input"
				name="islandColor"
				type="color"
			/>
		</div>
		<div class="theme-helper__field">
			<label class="theme-helper__label" for="skyColorOne">Sky Color #1</label>
			<input
				bind:value={skyColorOne}
				on:input={() => updateIslandTheme()}
				class="theme-helper__input"
				name="islandColor"
				type="color"
			/>
		</div>
		<div class="theme-helper__field">
			<label class="theme-helper__label" for="skyColorTwo">Sky Color #2</label>
			<input
				bind:value={skyColorTwo}
				on:input={() => updateIslandTheme()}
				class="theme-helper__input"
				name="islandColor"
				type="color"
			/>
		</div>
		<div class="theme-helper__field">
			<label class="theme-helper__label" for="waterColorOne">Water Color #1</label>
			<input
				bind:value={waterColorOne}
				on:input={() => updateIslandTheme()}
				class="theme-helper__input"
				name="waterColorOne"
				type="color"
			/>
		</div>
		<div class="theme-helper__field">
			<label class="theme-helper__label" for="waterColorTwo">Water Color #2</label>
			<input
				bind:value={waterColorTwo}
				on:input={() => updateIslandTheme()}
				class="theme-helper__input"
				name="waterColorTwo"
				type="color"
			/>
		</div>
		<button on:click={() => copy()}>copy</button>
	</div>
{/if}

<style lang="scss">
	.theme-helper {
		display: flex;
		flex-flow: column;
		gap: 1rem;
		background-color: rgba(0 0 0 / 80%);
		position: fixed;
		width: 300px;
		top: 2rem;
		right: 2rem;

		&__field {
			width: 100%;
			padding: 0.25rem;
		}

		&__label {
			color: white;
		}

		&__input {
			float: right;
		}
	}
</style>
