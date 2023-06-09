import * as PIXI from 'pixi.js'
import bgText from '@/assets/images/prints_en.png'
import smallBg from '@/assets/images/small_big.png'
import double from '@/assets/images/double.png'

export class APP {
  app: PIXI.Application<PIXI.ICanvas>
  constructor() {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x345C17,
      resolution: window.devicePixelRatio,
    })

    this.create()
  }

  create() {
    PIXI.Assets.add('name', bgText)
    PIXI.Assets.add('small', smallBg)
    PIXI.Assets.add('double', double)

    PIXI.Assets.load(['name', 'small', 'double']).then((res) => {
      const backgroundContainer: PIXI.Container<PIXI.DisplayObject> = new PIXI.Container()
      this.app.stage.addChild(backgroundContainer)
      const sprit = new PIXI.Sprite(res.name)
      sprit.scale.set(0.5)

      backgroundContainer.addChild(sprit)
      //  背景
      const bgContainer = new PIXI.Container()
      const bgSprit = new PIXI.Sprite(res.small)
      bgSprit.scale.set(0.5)
      bgContainer.addChild(bgSprit)
      backgroundContainer.addChild(bgContainer)
      backgroundContainer.addChildAt(bgContainer, 0)
      // 背景2

      for (let index = 0; index < 4; index++) {
        const doubleContainer = new PIXI.Container()
        const doubleSprit = new PIXI.Sprite(res.double)
        doubleSprit.scale.set(0.5)
        doubleSprit.position.set(169, 51)
        doubleContainer.addChild(doubleSprit)

        backgroundContainer.addChild(doubleContainer)
        backgroundContainer.addChildAt(doubleContainer, 0)
      }

      backgroundContainer.position.set(200, 200)
    }).catch((error) => {
      console.log(error)
    })
  }

  createBackgroundSprite() {

  }
}
