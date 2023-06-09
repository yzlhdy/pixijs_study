import printEn from '@/assets/images/prints_en.png'
import double from '@/assets/images/double.png'
import smallBig from '@/assets/images/small_big.png'
import domino from '@/assets/images/domino.png'
import airplane from '@/assets/images/airplane.png'

export const allTextureKeys = {
  printsEn: 'prints_en',
  double: 'double',
  smallBig: 'smallBig',
  domino: 'domino',
  symbolsJson: 'symbolsJson',
  frames: 'frames',
  airplane: 'airplane',
  bullet1: 'bullet1',
  bullet2: 'bullet2',

}
const appTextures = {
  [allTextureKeys.printsEn]: printEn,
  [allTextureKeys.double]: double,
  [allTextureKeys.smallBig]: smallBig,
  [allTextureKeys.domino]: domino,
  [allTextureKeys.airplane]: airplane,
  [allTextureKeys.symbolsJson]: '/public/symbols.json',
  [allTextureKeys.frames]: '/public/frames.json',
  [allTextureKeys.bullet1]: '/public/bullets/bullet1.json',
  [allTextureKeys.bullet2]: '/public/bullets/bullet2.json',

}
export default appTextures
