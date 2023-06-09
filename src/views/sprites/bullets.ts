import * as PIXI from 'pixi.js'
import { appConstants } from '../game/common/constants'

export class Bullets {
  app: PIXI.Application<PIXI.ICanvas>
  bullets!: PIXI.Container
  private timeouts: any
  private bulletsTypes: string []
  private bulletsSpeed: number
  private allTextures: any
  constructor(app: PIXI.Application<PIXI.ICanvas>) {
    this.app = app
    this.bulletsTypes = ['Bullet_Sequence1', 'Bullet_Sequence2']
    this.bulletsSpeed = 1
    this.allTextures = {}
    //  初始化
    this.initBullets()
  }

  initBullets() {
    this.bullets = new PIXI.Container()
    this.bullets.name = appConstants.containers.bullets
  }

  clearBullets() {
    this.bullets.children.forEach((item: PIXI.DisplayObject) => {
      this.bullets.removeChild(item)
      item.destroy()
    })
  }

  addBullets(coord: { x: number; y: number }) {
    const bulletsType = this.bulletsTypes[Math.floor(Math.random() * this.bulletsTypes.length)]

    let textures: PIXI.Texture<PIXI.Resource>[] = []

    if (this.allTextures && this.allTextures[bulletsType]) {
      textures = this.allTextures[bulletsType]
    }
    else {
      for (let i = 0; i < 6; i++) {
        const texture: PIXI.Texture<PIXI.Resource> = PIXI.Texture.from(`${bulletsType} ${i + 1}.png`)
        textures.push(texture)
      }
      this.allTextures[bulletsType] = textures
    }

    const bullet: PIXI.AnimatedSprite = new PIXI.AnimatedSprite(textures)
    const filter = new PIXI.filters.ColorMatrixFilter()
    bullet.loop = false
    const { matrix } = filter
    matrix[1] = Math.sin(Math.random() * 10)
    matrix[2] = Math.cos(Math.random() * 10)
    matrix[3] = Math.cos(Math.random() * 10)
    matrix[4] = Math.sin(Math.random() * 10)
    matrix[5] = Math.sin(Math.random() * 10)
    matrix[6] = Math.sin(Math.random() * 10)
    bullet.filters = [filter]
    bullet.animationSpeed = 0.2
    bullet.anchor.set(0.5)
    bullet.position.set(coord.x, coord.y)

    this.bullets.addChild(bullet)
    bullet.play()
    this.timeouts = setTimeout(() => {
      this.timeouts = null
    }, appConstants.timeouts.playerLock)
  }

  destroyBullet(bullet: any) {
    this.bullets.removeChild(bullet)
    bullet.destroy({ children: true })
  }

  bulletTick() {
    const toRemove: PIXI.DisplayObject[] = []
    this.bullets.children.forEach((item: PIXI.DisplayObject) => {
      item.position.y -= this.bulletsSpeed * 2
      if (item.position.y < 0)
        toRemove.push(item)
    })

    toRemove.forEach((item: PIXI.DisplayObject) => {
      this.bullets.removeChild(item)
      item.destroy({ children: true })
    })
  }
}
