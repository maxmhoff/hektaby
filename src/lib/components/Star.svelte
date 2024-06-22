<script lang="ts">
	export let hasFill = false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="48"
	height="48"
	viewBox="0 0 24 24"
	stroke="currentColor"
	stroke-width="1.25"
	stroke-linecap="round"
	stroke-linejoin="round"
    class={`star ${hasFill ? 'star--fill' : ''}`}
	><polygon
		points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
	/></svg
>

<style lang="scss">
    .star {
        fill: hsl(51, 98%, 100%);
        &--fill {
            fill: hsl(51, 98%, 50%);
        }
    }
</style>