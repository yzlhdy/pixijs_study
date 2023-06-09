import * as PIXI from 'pixi.js'
import { getTexture, loadAssets } from './common/assets'
import { allTextureKeys } from './common/textures'

const REEL_WIDTH = 160
const SYMBOL_SIZE = 150
async function createScene(view: HTMLElement) {
  const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 'black',
    resolution: window.devicePixelRatio,
  })
  const slotTextures = [
    getTexture(allTextureKeys.symbolsJson).textures.symbol_0,
    getTexture(allTextureKeys.symbolsJson).textures.symbol_1,
    getTexture(allTextureKeys.symbolsJson).textures.symbol_2,
    getTexture(allTextureKeys.symbolsJson).textures.symbol_3,
    getTexture(allTextureKeys.symbolsJson).textures.symbol_4,
    getTexture(allTextureKeys.symbolsJson).textures.symbol_5,
    getTexture(allTextureKeys.symbolsJson).textures.symbol_6,
    getTexture(allTextureKeys.symbolsJson).textures.symbol_7,
    getTexture(allTextureKeys.symbolsJson).textures.symbol_8,
  ]

  // Build the reels
  const reels: any[] = []

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

    // Build the symbols
    for (let j = 0; j < 4; j++) {
      const symbolBox: PIXI.Sprite = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)])
      // Scale the symbol to fit symbol area.
      symbolBox.y = j * SYMBOL_SIZE
      symbolBox.scale.x = symbolBox.scale.y = Math.min(SYMBOL_SIZE / symbolBox.width, SYMBOL_SIZE / symbolBox.height)
      symbolBox.x = Math.round((SYMBOL_SIZE - symbolBox.width) / 2)
      reel.symbols.push(symbolBox)
      rc.addChild(symbolBox)
    }
    reels.push(reel)
  }
  // --------------------------
  // Build top & bottom covers and position reelContainer
  const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2
  reelContainer.y = margin
  reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5)
  const top = new PIXI.Graphics()
  top.beginFill(0, 1)
  top.drawRect(0, 0, app.screen.width, margin)
  const bottom = new PIXI.Graphics()
  bottom.beginFill(0, 1)
  bottom.drawRect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin)

  // Add play text
  const style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
  })

  const playText = new PIXI.Text('Spin the wheels!', style)
  playText.x = Math.round((bottom.width - playText.width) / 2)
  playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2)
  bottom.addChild(playText)

  // Add header text
  const headerText = new PIXI.Text('PIXI MONSTER SLOTS!', style)
  headerText.x = Math.round((top.width - headerText.width) / 2)
  headerText.y = Math.round((margin - headerText.height) / 2)
  top.addChild(headerText)

  view.appendChild(app.view as any)
  app.stage.addChild(bottom)
  app.stage.addChild(reelContainer)

  // ---------------
  // Set the interactivity.
  bottom.interactive = true
  bottom.cursor = 'pointer'
  bottom.addListener('pointerdown', () => {
    startPlay()
  })

  let running = false
  // Reels done handler.
  function reelsComplete() {
    running = false
  }
  // Function to start playing.
  function startPlay() {
    if (running)
      return
    running = true

    for (let i = 0; i < reels.length; i++) {
      const r = reels[i]
      const extra = Math.floor(Math.random() * 3)
      const target = r.position + 10 + i * 5 + extra
      const time = 2500 + i * 600 + extra * 600
      console.log(extra, target, time)
      tweenTo(r, 'position', target, time, backout(0.4), null, i === reels.length - 1
        ? reelsComplete
        : (item: any) => {
            console.log(item)
          })
    }
  }
  const tweening: any[] = []
  function tweenTo(object: any, property: any, target: any, time: any, easing: any, onchange: any, oncomplete: any) {
    const tween = {
      object,
      property,
      propertyBeginValue: object[property],
      target,
      easing,
      time,
      change: onchange,
      complete: oncomplete,
      start: Date.now(),
    }

    tweening.push(tween)
    return tween
  }

  // Backout function from tweenjs.
  // https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
  function backout(amount: any) {
    return (t: any) => (--t * t * ((amount + 1) * t + amount) + 1)
  }

  app.ticker.add(() => {
    for (let i = 0; i < reels.length; i++) {
      const r = reels[i]
      r.blur.blurY = (r.position - r.previousPosition) * 8
      r.previousPosition = r.position
      for (let j = 0; j < r.symbols.length; j++) {
        const s = r.symbols[j]
        const prevy = s.y
        s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE
        if (s.y < 0 && prevy > SYMBOL_SIZE) {
          s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)]
          console.log(s.texture)
          s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height)
          s.x = Math.round((SYMBOL_SIZE - s.width) / 2)
        }
      }
    }
  })

  // Listen for animate update.
  app.ticker.add((delta) => {
    const now = Date.now()
    const remove = []
    for (let i = 0; i < tweening.length; i++) {
      const t = tweening[i]
      const phase = Math.min(1, (now - t.start) / t.time)

      t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase))
      if (t.change)
        t.change(t)
      if (phase === 1) {
        t.object[t.property] = t.target
        if (t.complete)
          t.complete(t)
        remove.push(t)
      }
    }
    for (let i = 0; i < remove.length; i++)
      tweening.splice(tweening.indexOf(remove[i]), 1)
  })
  // Basic lerp funtion.
  function lerp(a1: any, a2: any, t: any) {
    return a1 * (1 - t) + a2 * t
  }
}

export function initGame(view: HTMLElement) {
  loadAssets((num: any) => {
    if (num === 'all')
      createScene(view)
  })
}
