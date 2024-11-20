import p5 from 'p5'
import { Env } from '../../env'
import { MapNode, aStarSearch } from '../../pathfinding'

export class TestTank {
  p: p5
  env: Env
  moveSpeed = 2
  maxBlood = 100
  blood = 100
  path: MapNode[] = []
  currentIndex = 0
  x = 150
  y = 150
  width = 16
  height = 30
  isMove = false
  image: p5.Image
  image_wreak: p5.Image

  rotate: number = 0
  animationFrames: number = 0
  maxAnimationFrames: number = 2

  constructor(p: p5, env: Env) {
    this.p = p
    this.env = env
    this.image = this.p.loadImage('src/assets/units/test_tank/tank.png')
    this.image_wreak = this.p.loadImage('src/assets/units/test_tank/tank_dead.png')
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
    if (this.path.length === 0 || this.currentIndex >= this.path.length) {
      this.isMove = false
    } else {
      this.isMove = true
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
  }

  draw() {
    // 绘制本体
    this.p.push()
    this.p.translate(this.x, this.y)
    this.p.rotate(this.rotate  * this.p.HALF_PI * 0.001 * this.p.deltaTime)
    if (this.animationFrames >= this.maxAnimationFrames) this.animationFrames = 0
    this.p.image(this.image, this.x, this.y, this.width, this.height, this.animationFrames * this.width, 0, this.width, this.height)
    this.animationFrames++
    this.rotate++
    this.p.pop()

    // this.p.stroke(0, 0, 0)
    // this.p.fill(89, 115, 255)
    // this.p.ellipse(this.x + this.env.gridSize / 2, this.y + this.env.gridSize / 2, this.env.gridSize, this.env.gridSize)

    // this.p.textSize(8)
    //   this.p.text('移动中', this.x-this.env.gridSize, this.y + this.env.gridSize)
    // 绘制血量
    if (this.blood != this.maxBlood) {
      this.p.fill(234, 237, 255, 128)
      this.p.rect(this.x - this.env.gridSize / 2, this.y + this.env.gridSize * 1.2, this.env.gridSize * 2, 5)
      this.p.fill(89, 115, 255)
      this.p.rect(this.x - this.env.gridSize / 2, this.y + this.env.gridSize * 1.2, ((this.env.gridSize * 2) / this.maxBlood) * this.blood, 5)
    }

    // 绘制路线以及移动
    if (this.path.length === 0 || this.currentIndex >= this.path.length) return
    this.p.stroke(89, 115, 255)
    this.p.line(
      this.x + this.env.gridSize / 2,
      this.y + this.env.gridSize / 2,
      this.path[this.currentIndex].x * this.env.gridSize + this.env.gridSize / 2,
      this.path[this.currentIndex].y * this.env.gridSize + this.env.gridSize / 2
    )
    for (let i = this.currentIndex + 1; i < this.path.length; i++) {
      this.p.line(
        this.path[i - 1].x * this.env.gridSize + this.env.gridSize / 2,
        this.path[i - 1].y * this.env.gridSize + this.env.gridSize / 2,
        this.path[i].x * this.env.gridSize + this.env.gridSize / 2,
        this.path[i].y * this.env.gridSize + this.env.gridSize / 2
      )
    }

    this.move()
  }
}
