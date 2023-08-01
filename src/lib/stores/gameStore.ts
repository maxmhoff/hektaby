import type Tile from '$lib/types/tile';
import type { TileType } from '$lib/types/tile';
import { writable, type Writable } from 'svelte/store';

export const gameState: Writable<'loading' | 'in progress' | 'finished'> = writable('in progress');
export const seed: Writable<string> = writable('');
export const score: Writable<number> = writable(0);
export const specialZones: Writable<number> = writable(1);
export const tiles: Writable<Tile[]> = writable([]);
export const zoneQueue: Writable<TileType[]> = writable([]);
