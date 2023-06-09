import * as PIXI from 'pixi.js'
import { Player } from '../sprites/player'
import { Bullets } from '../sprites/bullets'
import { loadAssets } from './common/assets'
import { appConstants } from './common/constants'

const WIDTH = appConstants.WIDTH
const HEIGHT = appConstants.HEIGHT

const gameState: { app: PIXI.Application<PIXI.ICanvas> | null; mousePosition: number } = {
  app: null,
  mousePosition: 0,
}
let player: Player
let bullets: Bullets
//  创建
function createScene(view: HTMLElement) {
  const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: '#140c56',
    resolution: window.devicePixelRatio,
    antialias: true,
    width: WIDTH,
    height: HEIGHT,
  })

  view.appendChild(app.view as any)
  gameState.app = app
  const rootContainer = app.stage
  rootContainer.interactive = true
  rootContainer.hitArea = app.screen

  player = new Player(app, rootContainer)
  rootContainer.addChild(player.player)
  bullets = new Bullets(app)
  rootContainer.addChild(bullets.bullets)
}

function initInteraction() {
  gameState.mousePosition = player.getPlayer.position.x
  gameState.app?.stage.addEventListener('pointermove', (e: PIXI.FederatedPointerEvent) => {
    gameState.mousePosition = e.global.x
  })
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'Space')
      player.playerShoots(bullets.addBullets.bind(bullets))
  })

  gameState.app?.ticker.add((_) => {
    player.playerTick(gameState)
    bullets.bulletTick()
  })
}

export function initGame(view: HTMLElement) {
  loadAssets((num: number) => {
    console.log(Math.floor(num * 100))
    if (num === 1) {
      createScene(view)
      initInteraction()
    }
  })
}
