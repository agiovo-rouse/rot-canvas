import { DIRS } from 'rot-js'
import { TileTypes } from '../../constants/Tiles'
import GameObject from '../GameObject'

export default class Player extends GameObject {
  constructor(game, x, y, color = 'yellow') {
    super(game, x, y, color)
    this.draw()
  }

  act = () => {
    this.game.engine.lock()
    /* wait for user input; do stuff when user hits a key */
    window.addEventListener('keydown', this)
  }

  handleEvent = e => {
    /* process user input */
    // console.log(e)
    let keyMap = {}
    keyMap[38] = 0
    keyMap[33] = 1
    keyMap[39] = 2
    keyMap[34] = 3
    keyMap[40] = 4
    keyMap[35] = 5
    keyMap[37] = 6
    keyMap[36] = 7

    let code = e.keyCode

    if (code == 13 || code == 32) {
      this.checkBox()
      return
    }
    /* one of numpad directions? */
    if (!(code in keyMap)) { return }

    /* is there a free space? */
    let dir = DIRS[8][keyMap[code]]
    let newX = this.x + dir[0]
    let newY = this.y + dir[1]
    let newKey = newX + ',' + newY
    if (!(newKey in this.game.map)) { return }
    //draw wathever tile is in position x, y (Re painting)
    const mapTile = TileTypes[this.game.map[this.x + ',' + this.y]]
    GameObject.drawTile(this.ctx, this.x, this.y, mapTile.color)
    this.x = newX
    this.y = newY
    this.draw() // Finally draw the player in new position
    window.removeEventListener('keydown', this)
    this.game.engine.unlock()
  }


  checkBox = () => {
    let key = this.x + ',' + this.y
    if (this.game.map[key] != '*') {
      alert('There is no box here!')
    } else if (key == this.game.getAnanas()) {
      alert('Hooray! You found the treasure and won this game.')
      this.game.engine.lock()
      window.removeEventListener('keydown', this)
    } else {
      console.log('key found', this.game.map[key])
      alert('This box is empty :-(')
    }
  }
}