import * as PIXI from 'pixi.js'
import { getTexture } from '../common/assets'
import { allTextureKeys } from '../common/textures'

const REEL_WIDTH = 160
const SYMBOL_SIZE = 150
export const slotTextures: any[] = [
]
// Build the reels
export const reels: any[] = []
export function createRells(): PIXI.Container {
  for (let index = 0; index < 9; index++) {
    slotTextures.push(
      getTexture(allTextureKeys.symbolsJson).textures[`{symbol_${index}}`],
    )
  }
  const reelContainer = new PIXI.Container()
  for (let i = 0; i < 5; i++) {
    const rc = new PIXI.Container()
    rc.x = i * REEL_WIDTH
    reelContainer.addChild(rc)
    const reel: any = {
      container: rc,
      symbols: [],
      position: 0,
      previousPosition: 0,
      blur: new PIXI.filters.BlurFilter(),
    }
    reel.blur.blurX = 0
    reel.blur.blurY = 0
    rc.filters = [reel.blur]

    for (let j = 0; j < 4; j++) {
      const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)])
      symbol.y = j * SYMBOL_SIZE
      symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height)
      symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2)
      reel.symbols.push(symbol)
      rc.addChild(symbol)
    }
    reels.push(reel)
  }
  return reelContainer
}
