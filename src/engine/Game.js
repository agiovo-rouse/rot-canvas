import { WIDTH, HEIGHT, TILESIZE } from '../constants/GAME'
import { Map, RNG, Scheduler, Engine } from 'rot-js'
import { TileTypes } from '../constants/Tiles'
import Player from './objects/Player'
import GameObject from './GameObject'
import Enemy from './objects/Enemy'

export default class Game {
  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    document.body.append(this.canvas)
    this.canvas.width = WIDTH
    this.canvas.height = HEIGHT
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT)
    this.gameObjects = []
    this.floor = [] //Floor elements won't be taken in account for any calculations (no collisions for intance)
    this.collisionTags = ['wall']
    this.map = {}
    this.ananas = null
    this._generateMap()
    let scheduler = new Scheduler.Simple()
    scheduler.add(this.player, true)
    scheduler.add(this.pedro, true)
    this.engine = new Engine(scheduler)
    this.engine.start()


  }

  _generateMap = () => {
    let digger = new Map.Digger()
    let freeCells = []

    let digCallback = (x, y, value) => {
      if (value) return /* do not store walls */

      let key = x + ',' + y
      freeCells.push(key)
      this.map[key] = '.'
    }
    digger.create(digCallback)
    this._generateBoxes(freeCells)
    this._drawWholeMap()
    // this._createPlayer(freeCells)
    this.player = this._createBeing(Player, freeCells)
    this.pedro = this._createBeing(Enemy, freeCells)
  }

  _generateBoxes = freeCells => {
    for (let i = 0; i < 10; i++) {
      let index = Math.floor(RNG.getUniform() * freeCells.length)
      let key = freeCells.splice(index, 1)[0]
      this.map[key] = '*'
      if (i == 0) {
        this.ananas = key
      } /* first box contains an ananas */
    }
  }

  getAnanas = () => {
    return this.ananas
  }

  _createBeing = (what, freeCells) => {
    let index = Math.floor(RNG.getUniform() * freeCells.length)
    let key = freeCells.splice(index, 1)[0]
    let parts = key.split(',')
    let x = parseInt(parts[0])
    let y = parseInt(parts[1])
    return new what(this, x, y)
  }

  _canvasDraw = (x, y, tile) => {
    this.ctx.fillStyle = tile.color
    this.ctx.fillRect(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE)
  }

  _drawWholeMap = () => {
    for (let key in this.map) {
      let parts = key.split(',')
      let x = parseInt(parts[0])
      let y = parseInt(parts[1])
      const tile = TileTypes[this.map[key]]
      GameObject.drawTile(this.ctx, x, y, tile.color)
    }
  }

  draw = () => {
    this.gameObjects.forEach(obj => obj.draw())
  }

}