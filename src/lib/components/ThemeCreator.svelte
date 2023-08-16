<script lang="ts">
	import { fade } from 'svelte/transition';
	import { gameState, islandTheme } from '$lib/stores/gameStore';

	let isActive = false;
	let seedThemeLoaded = false;

	let name: string;
	let tags: string;
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
		islandTheme.set({
			themeName: name,
			colors: {
				islandColor,
				skyColorOne,
				skyColorTwo,
				waterColorOne,
				waterColorTwo
			},
			tags: tags?.trim().split(',')
		});
	}

	$: {
		if ($gameState === 'loading') {
			seedThemeLoaded = false;
		}

		if ($gameState === 'in progress' && !seedThemeLoaded) {
			name = $islandTheme.themeName;
			islandColor = $islandTheme.colors.islandColor;
			skyColorOne = $islandTheme.colors.skyColorOne;
			skyColorTwo = $islandTheme.colors.skyColorTwo;
			waterColorOne = $islandTheme.colors.waterColorOne;
			waterColorTwo = $islandTheme.colors.waterColorTwo;
			tags = $islandTheme.tags.join(', ');
			seedThemeLoaded = true;
		}
	}

	function copy() {
		let formattedTags = tags
			? tags
					.replace(/[\r\n]+/g, ' ')
					.trim()
					.split(',')
					.map((tag) => `'${tag.toLowerCase().trim()}'`)
					.join(', ')
			: null;

		let tagSection = formattedTags ? `\ttags: [${formattedTags}],` : '';
		let valueToCopy = name
			? `${name.toLowerCase()}: {\n\tcolors: {\n\t\tislandColor: '${islandColor}',\n\t\tskyColorOne: '${skyColorOne}',\n\t\tskyColorTwo: '${skyColorTwo}',\n\t\twaterColorOne: '${waterColorOne}',\n\t\twaterColorTwo: '${waterColorTwo}',\n\t},${
					tagSection ? '\n' + tagSection : ''
			  }\n}`
			: `{\n\tcolors: {\n\t\tislandColor: '${islandColor}',\n\t\tskyColorOne: '${skyColorOne}',\n\t\tskyColorTwo: '${skyColorTwo}',\n\t\twaterColorOne: '${waterColorOne}',\n\t\twaterColorTwo: '${waterColorTwo}',\n\t},${
					tagSection ? '\n' + tagSection : ''
			  }\n}`;

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
	<div class="theme-helper" transition:fade={{ duration: 200 }}>
		<div class="theme-helper__field">
			<label class="theme-helper__label" for="name">Theme Name</label>
			<input
				bind:value={name}
				on:input={() => updateIslandTheme()}
				class="theme-helper__input"
				name="name"
				type="text"
			/>
		</div>
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
		<div class="theme-helper__field">
			<label class="theme-helper__label" for="tags">Tags </label>
			<textarea
				bind:value={tags}
				class="theme-helper__input theme-helper__input--lg"
				name="tags"
				placeholder="separate by comma"
			/>
		</div>
		<button class="theme-helper__copy" on:click={() => copy()}>copy</button>
	</div>
{/if}

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

	.theme-helper {
		display: flex;
		flex-flow: column;
		gap: 1rem;
		background-color: rgba(0 0 0 / 80%);
		position: fixed;
		width: 400px;
		top: 50%;
		right: 2rem;
		padding: 1rem;
		transform: translateY(-50%);

		&__field {
			display: flex;
			width: 100%;
			min-height: 2rem;
			padding: 0.25rem;
			justify-content: space-between;
			align-items: center;
			font-size: $text-sm;
		}

		&__label {
			color: white;
		}

		&__input {
			float: right;
			max-width: 32ch;
			font-size: $text-sm;
			resize: none;

			&--lg {
				height: 8rem;
			}
		}

		&__copy {
			background-color: #fff;
			font-size: $text-xs;
			padding: 0.5rem;
		}
	}
</style>
