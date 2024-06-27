<h2 class="card__title">
    <slot />
</h2>
<hr class="card__horizontal-ruler" />

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

    .card {
        &__title {
			display: flex;
			gap: 0.5rem;
			color: white;
			font-family: 'outfit', sans-serif;
			font-size: $text-lg;
			margin-bottom: 1rem;
		}

		&__horizontal-ruler {
			width: 100%;
			border: none;
			border-bottom: 2px solid white;
			margin-bottom: 1rem;
		}
    }
</style>