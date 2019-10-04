import { TILESIZE } from '../constants/GAME'

export default class GameObject {
  constructor(game, x, y, color) {
    this.game = game
    this.ctx = game.ctx
    this.x = x
    this.y = y
    this.color = color
  }

  update = (x, y) => {
    this.x += x
    this.y += y
  }

  getPosition = () => {
    return { x: this.x, y: this.y }
  }

  static drawTile = (ctx, x, y, color) => {
    ctx.fillStyle = color
    ctx.fillRect(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE)
  }

  draw = () => {
    const x = this.x * TILESIZE
    const y = this.y * TILESIZE
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(x, y, TILESIZE, TILESIZE)
  }


}