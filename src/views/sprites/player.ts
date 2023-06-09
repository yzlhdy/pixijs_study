import * as PIXI from 'pixi.js'
import { getTexture } from '../game/common/assets'
import { allTextureKeys } from '../game/common/textures'
import { appConstants } from '../game/common/constants'

export class Player {
  player!: PIXI.Sprite
  private app: PIXI.Application<PIXI.ICanvas>
  private lockTimeout: any
  locked = false
  constructor(currApp: PIXI.Application<PIXI.ICanvas>, root: PIXI.Container) {
    this.app = currApp
    this.addPlayer()
  }

  // 添加玩家
  addPlayer() {
    if (this.player) {
      return this.player
    }
    else {
      this.player = new PIXI.Sprite(getTexture(allTextureKeys.airplane))
      this.player.name = appConstants.containers.player
      this.player.anchor.set(0.5)
      this.player.position.x = appConstants.WIDTH / 2
      this.player.position.y = appConstants.HEIGHT - 200
    }
  }

  // 获取玩家
  get getPlayer() {
    return this.player
  }

  lockPlayer() {
    if (this.lockTimeout)
      return
    else
      this.locked = true

    this.lockTimeout = setTimeout(() => {
      this.locked = false
      this.lockTimeout = null
    }, appConstants.timeouts.playerLock)
  }

  playerShoots(item: any) {
    if (!this.lockTimeout)
      item({ x: this.player.position.x, y: this.player.position.y })
  }

  playerTick(state: any) {
    this.player.alpha = 1
    const playerPosition = this.player.position.x
    this.player.position.x = state.mousePosition
    if (this.player.position.x < playerPosition)
      this.player.rotation = -0.3
    else if (this.player.position.x > playerPosition)
      this.player.rotation = 0.3
    else
      this.player.rotation = 0
  }
}
