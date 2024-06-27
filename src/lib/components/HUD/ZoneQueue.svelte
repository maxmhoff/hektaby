<script lang="ts">
	import zoneColors from "$lib/data/zone-colors";
	import { zoneQueue } from "$lib/stores/gameStore";
	import type { TileType } from "$lib/types/tile";
	import TileIcon from "./TileIcon.svelte";
    
    function getZoneColor(zone: TileType) {
		if(zone === 'residential') return zoneColors.residential.hud;
		if(zone === 'commercial') return zoneColors.commercial.hud;
		if(zone === 'industrial') return zoneColors.industrial.hud;
	}
</script>
<div class="zone-queue">
    {#if $zoneQueue}
        <ul class="zone-queue__list">
            {#each $zoneQueue as zone, idx}
                <li
                    class={`zone-queue__item zone-queue__item--${zone} ${
                        idx === $zoneQueue.length - 1 ? 'zone-queue__item--last' : ''
                    }`}
                    style={`background-color: ${getZoneColor(zone)}`}
                >
                    {#if idx === $zoneQueue.length - 1}
                        <TileIcon tileType={zone} />
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="scss">
    @use '$lib/styles/variables.scss' as *;

    .zone-queue {
        position: absolute;
        bottom: 5rem;
        width: 100%;
        padding: $container-padding-mobile;
        pointer-events: none;
        user-select: none;

        @media (min-width: $tablet) {
            bottom: 3rem;
			padding: $container-padding-desktop;
		}

		&__list {
            width: fit-content;
            margin-right: auto;
            margin-left: auto;
			display: flex;
            gap: .5rem;
            justify-content: space-between;
		}

		&__item {
			position: relative;
			width: 0.5rem;
			height: 2rem;
			margin-top: 1.4rem;
			background-color: black;

			&--last {
				width: 4rem;
				height: 4.8rem;
				margin-top: 0;
				clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
			}
		}
    }
</style>