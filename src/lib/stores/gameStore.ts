import type { TileType } from '$lib/types/tile';
import { writable, type Writable } from 'svelte/store';

export const currentGame: Writable<{ gameState: 'in progress' | 'finished', score: number; specialZones: number; zoneQueue: TileType[] }> =
	writable({ gameState: 'in progress', score: 0, specialZones: 1, zoneQueue: [] });
