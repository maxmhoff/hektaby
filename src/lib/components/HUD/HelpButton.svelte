<script>

	import { showTutorial } from "$lib/stores/gameStore";

</script>
<button class="help" on:click={() => showTutorial.update(prev => !prev)}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="48"
		height="48"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="3"
		stroke-linecap="round"
		stroke-linejoin="round"
        class="help__icon"
		><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path
			d="M12 17h.01"
		/></svg
	>
</button>

<style lang="scss">
	.help {
		display: grid;
		place-items: center;
        height: 48px;
        width: 48px;
		padding: 0.5rem;
		color: white;
		background-color: rgba(0, 0, 0, 0.3);
		border: none;
		border-radius: 50%;
		cursor: pointer;
        overflow: hidden;

        &:focus {
            outline: none;
        }

        &:hover, &:focus-visible {
            background-color: rgba(0, 0, 0, 1);
        }

        &__icon {
            transform: translate(-8px, -8px);
        }
	}
</style>
