import type Tile from '$lib/types/tile';
import * as THREE from 'three';

const predefinedTiles: Tile[] = [
	{
		tileIndex: 0,
		tileType: 'default',
		position: new THREE.Vector3(0, 0, 0),
		adjacentTiles: [1, 2, 3, 4, 5, 6],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 1,
		tileType: 'default',
		position: new THREE.Vector3(5, 0, -9),
		adjacentTiles: [0, 2, 6, 7, 8, 9],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 2,
		tileType: 'default',
		position: new THREE.Vector3(10, 0, 0),
		adjacentTiles: [0, 1, 3, 9, 10],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 3,
		tileType: 'default',
		position: new THREE.Vector3(5, 0, 9),
		adjacentTiles: [0, 2, 4, 10, 11, 12],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 4,
		tileType: 'default',
		position: new THREE.Vector3(-5, 0, 9),
		adjacentTiles: [0, 3, 5, 12, 13, 14],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 5,
		tileType: 'default',
		position: new THREE.Vector3(-10, 0, 0),
		adjacentTiles: [0, 4, 6, 14, 15],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 6,
		tileType: 'default',
		position: new THREE.Vector3(-5, 0, -9),
		adjacentTiles: [0, 1, 5, 7, 15, 16],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 7,
		tileType: 'default',
		position: new THREE.Vector3(0, 0, -18),
		adjacentTiles: [1, 6, 8, 16],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 8,
		tileType: 'default',
		position: new THREE.Vector3(10, 0, -18),
		adjacentTiles: [1, 7, 9],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 9,
		tileType: 'default',
		position: new THREE.Vector3(15, 0, -9),
		adjacentTiles: [1, 2, 8],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 10,
		tileType: 'default',
		position: new THREE.Vector3(15, 0, 9),
		adjacentTiles: [2, 3, 11],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 11,
		tileType: 'default',
		position: new THREE.Vector3(10, 0, 18),
		adjacentTiles: [3, 10, 12],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 12,
		tileType: 'default',
		position: new THREE.Vector3(0, 0, 18),
		adjacentTiles: [3, 4, 11, 13],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 13,
		tileType: 'default',
		position: new THREE.Vector3(-10, 0, 18),
		adjacentTiles: [4, 12, 14],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 14,
		tileType: 'default',
		position: new THREE.Vector3(-15, 0, 9),
		adjacentTiles: [4, 5, 13],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 15,
		tileType: 'default',
		position: new THREE.Vector3(-15, 0, -9),
		adjacentTiles: [5, 6, 16],
		value: 0,
		state: 'default'
	},
	{
		tileIndex: 16,
		tileType: 'default',
		position: new THREE.Vector3(-10, 0, -18),
		adjacentTiles: [6, 7, 15],
		value: 0,
		state: 'default'
	}
];

export default predefinedTiles;
