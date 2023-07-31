import type { TileType } from '$lib/types/tile';
import { writable, type Writable } from 'svelte/store';

export const currentGame: Writable<{score: number, specialZones: number, zoneQueue: TileType[]}> = writable({score: 0, specialZones: 1, zoneQueue: []});