export type TileType =
	| 'default'
	| 'commercial'
	| 'industrial'
	| 'residential'
	| 'park'
	| 'power plant'
	| 'school'
	| 'decoration';

type Tile = {
	tileIndex: number;
	tileType: TileType;
	position: THREE.Vector3;
	adjacentTiles: number[];
	value: number;
	state: 'default' | 'highlight' | 'active';
};

export default Tile;
