const TileTypes = {
  '.': {
    name: 'path',
    blocksPath: false,
    color: 'grey'
  },
  '*': {
    name: 'box',
    blocksPath: false,
    color: 'brown'
  },
  '@': {
    name: 'player',
    blocksPath: false,
    color: 'yellow'
  },
  'P': {
    name: 'enemy',
    blocksPath: false,
    color: 'red'
  }
}

export {
  TileTypes
}