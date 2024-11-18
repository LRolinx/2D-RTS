import p5 from 'p5'
import { Env } from '../../env'
/// 家(基地)
export class RtsHome {
  p: p5 | undefined = undefined
  x: number = 0
  y: number = 0
  width: number = 2
  height: number = 20
  // 血量
  blood: number = 1000

  constructor(p: p5, env: Env) {
    this.p = p

  }

  draw() {}
}
