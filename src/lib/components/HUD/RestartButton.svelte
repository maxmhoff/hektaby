<script lang="ts">
	export let resetCurrentGame: () => void;
</script>

<button class="restart" on:click={resetCurrentGame}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="3"
		stroke-linecap="round"
		stroke-linejoin="round"
		><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg
	>
</button>

<style lang="scss">
	.restart {
		display: grid;
		place-items: center;
		padding: 0.5rem;
		color: white;
		background-color: rgba(0,0,0, .3);
		border: none;
		border-radius: 50%;
		cursor: pointer;

		&:focus {
            outline: none;
        }

		&:hover, &:focus-visible {
            background-color: rgba(0, 0, 0, 1);
        }
	}
</style>
