<script lang="ts">
	import { fade } from 'svelte/transition';
	import { gameState, islandTheme } from '$lib/stores/gameStore';
	import islandThemes, { getThemeFromTag } from '$lib/data/island-themes';

	let isActive = false;
	let seedThemeLoaded = false;

	let currentTheme: string;
	let name: string;

	let islandColor: string;
	let skyColorOne: string;
	let skyColorTwo: string;
	let waterColorOne: string;
	let waterColorTwo: string;

	let tags: string;
	let designer: string;

	let unavailableTags: string[] = [];

	$: {
		if ($gameState === 'loading') {
			seedThemeLoaded = false;
		}

		if ($gameState === 'in progress' && !seedThemeLoaded) {
			updateValuesToCurrentIslandTheme();
			seedThemeLoaded = true;
		}
	}

	function updateValuesToCurrentIslandTheme() {
		currentTheme = $islandTheme.themeName;
		name = $islandTheme.themeName;
		islandColor = $islandTheme.colors.islandColor;
		skyColorOne = $islandTheme.colors.skyColorOne;
		skyColorTwo = $islandTheme.colors.skyColorTwo;
		waterColorOne = $islandTheme.colors.waterColorOne;
		waterColorTwo = $islandTheme.colors.waterColorTwo;
		tags = $islandTheme.tags.join(', ');
		designer = $islandTheme.designer;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'T' && event.shiftKey) {
			isActive = !isActive;
		}
	}

	function updateIslandTheme(isTheme?: boolean) {
		if (isTheme) {
			if (currentTheme === 'custom') return;
			islandTheme.set({ themeName: currentTheme, ...islandThemes[currentTheme] });
			unavailableTags = [];
			return updateValuesToCurrentIslandTheme();
		}
		currentTheme = 'custom';
		islandTheme.set({
			themeName: name,
			colors: {
				islandColor,
				skyColorOne,
				skyColorTwo,
				waterColorOne,
				waterColorTwo
			},
			tags: tags?.trim().split(','),
			designer: designer
		});
	}

	function checkTagsAvailability() {
		const tagsAlreadyInUse: string[] = [];
		tags.split(',').forEach((tag) => {
			const theme = getThemeFromTag(tag.trim().toLowerCase());
			if (theme && theme.themeName !== name) {
				tagsAlreadyInUse.push(tag);
			}
		});
		unavailableTags = [...tagsAlreadyInUse];
	}

	function copy() {
		checkTagsAvailability();
		if (unavailableTags.length > 0) return;

		let formattedTags = tags
			.replace(/[\r\n]+/g, ' ')
			.trim()
			.split(',')
			.map((tag) => tag.toLowerCase().trim())
			.sort() // This will alphabetize the tags
			.map((tag) => `'${tag}'`)
			.join(', ');

		let designerSection = `\tdesigner: '${designer}',`;
		let tagSection = formattedTags ? `\ttags: [${formattedTags}],` : '';

		let valueToCopy = `${name.toLowerCase()}: {\n\tcolors: {\n\t\tislandColor: '${islandColor}',\n\t\tskyColorOne: '${skyColorOne}',\n\t\tskyColorTwo: '${skyColorTwo}',\n\t\twaterColorOne: '${waterColorOne}',\n\t\twaterColorTwo: '${waterColorTwo}',\n\t},\n${designerSection}\n${tagSection}\n}`;

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
	<form class="theme-editor" transition:fade={{ duration: 200 }}>
		<p class="theme-editor__title">Theme Editor 🎨</p>
		<button class="theme-editor__close" on:click={() => (isActive = false)}>&#x2715</button>
		<hr class="theme-editor__hr" />
		<div class="theme-editor__field">
			<label class="theme-editor__label" for="theme">Themes</label>
			<select
				bind:value={currentTheme}
				on:change={() => updateIslandTheme(true)}
				class="theme-editor__input"
				name="theme"
			>
				{#each Object.keys(islandThemes) as themeName}
					<option style={`background-color: ${islandThemes[themeName].colors.waterColorTwo}90;`}
						>{themeName}</option
					>
				{/each}
				<option>custom</option>
			</select>
		</div>
		<div class="theme-editor__field">
			<label class="theme-editor__label" for="name">Theme Name</label>
			<input
				bind:value={name}
				on:input={() => updateIslandTheme()}
				class="theme-editor__input"
				name="name"
				type="text"
				required
			/>
		</div>
		<div class="theme-editor__field">
			<label class="theme-editor__label" for="islandColor">Island Color</label>
			<input
				bind:value={islandColor}
				on:input={() => updateIslandTheme()}
				class="theme-editor__input"
				name="islandColor"
				type="color"
			/>
		</div>
		<div class="theme-editor__field">
			<label class="theme-editor__label" for="skyColorOne">Sky Color #1</label>
			<input
				bind:value={skyColorOne}
				on:input={() => updateIslandTheme()}
				class="theme-editor__input"
				name="islandColor"
				type="color"
			/>
		</div>
		<div class="theme-editor__field">
			<label class="theme-editor__label" for="skyColorTwo">Sky Color #2</label>
			<input
				bind:value={skyColorTwo}
				on:input={() => updateIslandTheme()}
				class="theme-editor__input"
				name="islandColor"
				type="color"
			/>
		</div>
		<div class="theme-editor__field">
			<label class="theme-editor__label" for="waterColorOne">Water Color #1</label>
			<input
				bind:value={waterColorOne}
				on:input={() => updateIslandTheme()}
				class="theme-editor__input"
				name="waterColorOne"
				type="color"
			/>
		</div>
		<div class="theme-editor__field">
			<label class="theme-editor__label" for="waterColorTwo">Water Color #2</label>
			<input
				bind:value={waterColorTwo}
				on:input={() => updateIslandTheme()}
				class="theme-editor__input"
				name="waterColorTwo"
				type="color"
			/>
		</div>
		<div class="theme-editor__field">
			<label class="theme-editor__label" for="tags">Tags </label>
			<textarea
				bind:value={tags}
				on:change={() => checkTagsAvailability()}
				class="theme-editor__input theme-editor__input--lg"
				name="tags"
				placeholder="separate by comma"
			/>
		</div>
		<div class="theme-editor__error">
			{#if unavailableTags.length > 0}
				<p class="theme-editor__tags-unavailable">These tags are already in use:</p>
				<p>
					{#each unavailableTags as tag, idx}<span
							>{`${tag}${idx + 1 === unavailableTags.length ? '.' : ','}`}</span
						>{/each}
				</p>
			{/if}
		</div>
		<div class="theme-editor__field">
			<label class="theme-editor__label" for="designer">Designed by</label>
			<input
				bind:value={designer}
				on:input={() => updateIslandTheme()}
				class="theme-editor__input theme-editor__input--sans"
				name="designer"
				type="text"
				required
			/>
		</div>
		<button type="submit" class="theme-editor__copy" on:click={() => copy()}>copy</button>
	</form>
{/if}

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

	.theme-editor {
		display: flex;
		flex-flow: column;
		gap: 0.5rem;
		background-color: rgba(0 0 0 / 80%);
		position: fixed;
		width: 400px;
		top: 50%;
		right: 2rem;
		padding: 3rem 1rem 1rem;
		transform: translateY(-50%);
		border-radius: 1rem;
		user-select: none;

		&__title {
			position: absolute;
			top: 1rem;
			left: 1rem;
			font-size: $text-md;
			color: white;
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

		&__field {
			display: flex;
			width: 100%;
			min-height: 2rem;
			padding: 0.25rem;
			justify-content: space-between;
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

			&--sans {
				font-family: sans-serif;
				font-weight: 700;
			}
		}

		&__error {
			height: 2rem;
			margin-bottom: 0.5rem;
			color: rgb(255, 0, 0);
			line-height: 1.2;
			font-size: $text-xs;
		}

		&__copy {
			background-color: #fff;
			font-size: $text-sm;
			padding: 0.5rem;
		}
	}
</style>
