import { Assets } from 'pixi.js'
import appTextures, { allTextureKeys } from './textures'

Object.entries(appTextures).forEach(([key, value]) => {
  Assets.add(key, value)
})

const textures = new Map()

export function loadAssets(onProgress: any) {
  const keys: any = Object.entries(allTextureKeys).map(([_, value]) => value)
  Assets.load([...keys], onProgress).then((data) => {
    Object.entries(data).forEach(([key, value]) => {
      textures.set(key, value)
    })
  })
}

export function getTexture(id: string) {
  if (textures.has(id))
    return textures.get(id)

  return null
}
