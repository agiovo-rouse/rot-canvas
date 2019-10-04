import GameObject from '../GameObject'
import { Path } from 'rot-js'
import { TileTypes } from '../../constants/Tiles'

export default class Enemy extends GameObject {
  constructor(game, x, y, color = 'red') {
    super(game, x, y, color)
  }

  act = () => {
    let { x, y } = this.game.player.getPosition()
    let passableCallback = (x, y) => {
      return (x + ',' + y in this.game.map)
    }
    let astar = new Path.AStar(x, y, passableCallback, { topology: 4 })

    let path = []
    let pathCallback = (x, y) => {
      path.push([x, y])
    }
    astar.compute(this.x, this.y, pathCallback)

    path.shift() /* remove Enemy's position */
    if (path.length == 1) {
      this.game.engine.lock()
      alert('Game over - you were captured by Enemy!')
    } else {
      x = path[0][0]
      y = path[0][1]
      const mapTile = TileTypes[this.game.map[this.x + ',' + this.y]]
      GameObject.drawTile(this.ctx, this.x, this.y, mapTile.color)
      this.x = x
      this.y = y
      this.draw()
    }
  }

}