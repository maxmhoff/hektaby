<script lang="ts">
	import RestartButton from '$lib/components/HUD/RestartButton.svelte';
	import HelpButton from '$lib/components/HUD/HelpButton.svelte';
	import { islandTheme } from '$lib/stores/gameStore';
	import NewMapButton from './NewMapButton.svelte';

	export let resetCurrentGame: () => void;
    export let startNewGame: () => void;
</script>

<footer class="footer">
	<div class="footer__container">
		<p class="footer__info">
            <span>theme by: {$islandTheme.designer}</span>
            <br />
			<span>game version: 0.9</span>
		</p>
		<div class="footer__menu">
			<RestartButton {resetCurrentGame} />
			<HelpButton />
            <NewMapButton {startNewGame} />
		</div>
	</div>
</footer>

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

	.footer {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;

		&__container {
			display: flex;
			justify-content: space-between;
			align-items: end;
			width: 100%;
			height: 100%;
			max-width: $container-max-width;
			margin-right: auto;
			margin-left: auto;
			padding: $container-padding-mobile;

			@media (min-width: $tablet) {
				padding: $container-padding-desktop;
			}
		}

		&__info {
			color: rgba(255, 255, 255, 0.4);
			font-size: $text-sm;
			line-height: 1.25;
            transition: color .1s ease-in-out;
            user-select: none;

            &:hover {
                user-select: text;
                color: white;
            }
		}

		&__menu {
			display: flex;
			gap: 0.75rem;
		}
	}
</style>
