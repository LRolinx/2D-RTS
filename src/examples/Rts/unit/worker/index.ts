import p5 from 'p5'
import { Env } from '../../env'
import { MapNode, aStarSearch } from '../../pathfinding'

export class RtsWorker {
  p: p5
  env: Env
  moveSpeed = 2
  blood = 100
  path: MapNode[] = []
  currentIndex = 0
  x = 150
  y = 150

  constructor(p: p5, env: Env) {
    this.p = p
    this.env = env
  }

  setPath(endX: number, endY: number) {
    // 将鼠标点击的屏幕坐标转换为网格坐标
    const startNode = new MapNode(Math.floor(this.x / this.env.gridSize), Math.floor(this.y / this.env.gridSize), 0, 0, null)
    const endNode = new MapNode(Math.floor(endX / this.env.gridSize), Math.floor(endY / this.env.gridSize), 0, 0, null)

    // 执行 A* 寻路
    this.path = aStarSearch(this.env, startNode, endNode) ?? []
    this.currentIndex = 0
    console.log(this.path)
  }

  move() {
    if (this.path.length === 0 || this.currentIndex >= this.path.length) return

    const target = this.path[this.currentIndex]
    const dx = target.x * this.env.gridSize - this.x
    const dy = target.y * this.env.gridSize - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < this.moveSpeed) {
      this.currentIndex++
    } else {
      const angle = Math.atan2(dy, dx)
      this.x += this.moveSpeed * Math.cos(angle)
      this.y += this.moveSpeed * Math.sin(angle)
    }
  }

  draw() {
    this.p.fill(255, 0, 0)
    this.p.ellipse(this.x, this.y, this.env.gridSize, this.env.gridSize)

    if (this.path.length === 0 || this.currentIndex >= this.path.length) return
	this.p.stroke(89, 115, 255)
    this.p.line(this.x, this.y, this.path[this.currentIndex].x * this.env.gridSize, this.path[this.currentIndex].y * this.env.gridSize)
    for (let i = this.currentIndex+1; i < this.path.length; i++) {
      this.p.line(this.path[i - 1].x * this.env.gridSize, this.path[i - 1].y * this.env.gridSize, this.path[i].x * this.env.gridSize, this.path[i].y * this.env.gridSize)
    }
  }
}
