import type { IslandTheme } from '$lib/data/island-themes';
import islandThemes from '$lib/data/island-themes';
import type Tile from '$lib/types/tile';
import type { TileType } from '$lib/types/tile';
import { writable, type Writable } from 'svelte/store';

export const gameState: Writable<'loading' | 'in progress' | 'finished'> = writable('loading');
export const seed: Writable<string> = writable('');
export const score: Writable<number> = writable(0);
export const specialZones: Writable<number> = writable(1);
export const tiles: Writable<Tile[]> = writable([]);
export const zoneQueue: Writable<TileType[]> = writable([]);
export const difficulties: Writable<{easy: number, medium: number, hard: number} | undefined> = writable(undefined);
export const islandTheme: Writable<{ themeName: string } & IslandTheme> = writable({themeName: 'sunset',...islandThemes.sunset});
