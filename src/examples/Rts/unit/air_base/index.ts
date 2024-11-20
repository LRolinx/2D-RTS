import p5 from 'p5'
import { Env } from '../../env'
/// 单位-空军基地
export class AirBase {
  p: p5
  env: Env
  x: number = 522
  y: number = 504
  width: number = 2
  height: number = 20
  maxBlood = 1000
  // 血量
  blood: number = 1000

  constructor(p: p5, env: Env) {
    this.p = p
    this.env = env
  }

  draw() {
    // 绘制本体
    this.p.fill(89, 115, 255)
    this.p.square(this.x, this.y, this.env.gridSize)

    // 绘制血量
    this.p.fill(234, 237, 255, 128)
    this.p.rect(this.x - this.env.gridSize / 2, this.y + this.env.gridSize * 1.2, this.env.gridSize * 2, 5)
    this.p.fill(89, 115, 255)
    this.p.rect(this.x - this.env.gridSize / 2, this.y + this.env.gridSize * 1.2, ((this.env.gridSize * 2) / this.maxBlood) * this.blood, 5)
  }
}
