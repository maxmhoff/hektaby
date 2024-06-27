<div class="card">
	<slot />
</div>

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

	.card {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 340px;
		height: fit-content;
		max-height: 440px;
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
</style>
