import p5 from 'p5'
import { Env } from '../env'

// 单位-模板
export class Model {
  p: p5
  env: Env

  constructor(p: p5, env: Env) {
    this.p = p
    this.env = env
  }

  draw() {}
}
