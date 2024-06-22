<script lang="ts">
	export let onClick = () => {};
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
</script>

<button class="button" on:click={onClick} {disabled} {type}>
	<slot />
</button>

<style lang="scss">
	@use '$lib/styles/variables.scss' as *;

	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: .75rem 1.5rem;
		border: 2px solid white;
		border-radius: .5rem;
        background-color: transparent;
		color: white;
        letter-spacing: .0625rem;
        font-family: "Outfit";
		font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
		cursor: pointer;

		&:hover {
			background-color: white;
            color: black;
		}

		&:disabled {
			background-color: #c0c0c0;
			cursor: not-allowed;
		}

        &:focus {
            outline: none;
        }
        
        &:focus-visible {
            outline: 2px solid white;
        }
	}
</style>
