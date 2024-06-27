<script lang="ts">
	export let startNewGame: () => void;
</script>

<button class="new-map" on:click={startNewGame}>
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
		><path d="M5 9v6" /><path d="M9 9h3V5l7 7-7 7v-4H9V9z" /></svg
	>
</button>

<style lang="scss">
	.new-map {
		display: grid;
		place-items: center;
		padding: 0.5rem;
		color: white;
		background-color: rgba(0, 0, 0, 0.3);
		border: none;
		border-radius: 50%;
		cursor: pointer;

		&:focus {
			outline: none;
		}

		&:hover,
		&:focus-visible {
			background-color: rgba(0, 0, 0, 1);
		}
	}
</style>
