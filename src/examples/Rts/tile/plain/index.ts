import p5 from 'p5'
import { Env } from '../../env'

// 地形-平原
export class Plain {
  p: p5
  env: Env
  x: number = 0
  y: number = 0

  constructor(p: p5, env: Env, x: number, y: number) {
    this.p = p
    this.env = env

	this.x = x
	this.y = y
  }

  draw() {
	this.p.stroke(36, 36, 36)
	this.p.fill(30, 30, 30)
	this.p.rect(this.x, this.y, this.env.gridSize, this.env.gridSize)
  }
}
