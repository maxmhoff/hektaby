export type TileType = 'default' | 'commercial' | 'industrial' | 'residential' | 'park' | 'power plant' | 'forrest' | 'ocean' | 'mountain';

type Tile = {
    index: number,
    tileType: TileType,
    position: THREE.Vector3,
    adjacentTiles: number[],
    value: number,
};

export default Tile;