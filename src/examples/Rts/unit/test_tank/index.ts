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
	  this.animationFrames = 0
	} else {
	  this.isMove = true
	  this.animationFrames = (this.animationFrames + 1) % this.maxAnimationFrames
	  const target = this.path[this.currentIndex]
	  const dx = target.x * this.env.gridSize - this.x
	  const dy = target.y * this.env.gridSize - this.y
	  const dist = this.p.sqrt(dx * dx + dy * dy)
  
	  // 计算目标角度（atan2 自动处理各象限）
	  const angle = this.p.atan2(dy, dx) // angle = atan2(dy, dx)
	  
	  // 转换为角度，目标角度范围是 [-180°, 180°]
	  const targetRotate = (180 / this.p.PI) * angle + 90
  
	  // 旋转角度的差值 (delta)，确保旋转不跳跃
	  let delta = targetRotate - this.rotate
	  if (delta > 180) {
		delta -= 360 // 确保差值在 -180° 到 180° 之间
	  } else if (delta < -180) {
		delta += 360 // 确保差值在 -180° 到 180° 之间
	  }
  
	  // 使用lerp平滑旋转，同时控制旋转速度避免震荡
	  this.rotate += delta * 0.1 // 使用较小的 lerp 系数来平滑旋转
  
	  // 保证 rotate 始终在 0 到 360 度之间
	  if (this.rotate >= 360) {
		this.rotate -= 360
	  } else if (this.rotate < 0) {
		this.rotate += 360
	  }
  
	  // 使用旋转方向进行移动
	  const moveAngle = this.p.radians(this.rotate - 90) // 当前旋转角度转换为弧度，-90 是因为图像的默认方向是向上
	  this.x += this.moveSpeed * this.p.cos(moveAngle)
	  this.y += this.moveSpeed * this.p.sin(moveAngle)
  
	  // 判断是否到达目标点，若到达，则更新 currentIndex
	  const newDx = target.x * this.env.gridSize - this.x
	  const newDy = target.y * this.env.gridSize - this.y
	  const newDist = this.p.sqrt(newDx * newDx + newDy * newDy)
  
	  // 如果距离目标点小于一定范围（例如 2 单位），更新 currentIndex
	  if (newDist < this.env.gridSize) {
		this.currentIndex++
	  }
	}
  }
  

  draw() {
    // 绘制本体
    this.p.text(this.rotate, this.x, this.y)
    this.p.push()
    this.p.translate(this.x + this.width / 2, this.y + this.height / 2)
    this.p.rotate(this.p.radians(this.rotate))
    this.p.translate(-(this.x + this.width / 2), -(this.y + this.height / 2))
    this.p.image(this.image, this.x, this.y, this.width, this.height, this.animationFrames * this.width, 0, this.width, this.height)
    this.p.pop()

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
    const [bodyx, bodyy] = [this.x + this.env.gridSize / 2, this.y + this.env.gridSize / 2]
    const [nextx, nexty] = [this.path[this.currentIndex].x * this.env.gridSize + this.env.gridSize / 2, this.path[this.currentIndex].y * this.env.gridSize + this.env.gridSize / 2]
    this.p.line(bodyx, bodyy, nextx, nexty)
    for (let i = this.currentIndex + 1; i < this.path.length; i++) {
      this.p.line(
        this.path[i - 1].x * this.env.gridSize + this.env.gridSize / 2,
        this.path[i - 1].y * this.env.gridSize + this.env.gridSize / 2,
        this.path[i].x * this.env.gridSize + this.env.gridSize / 2,
        this.path[i].y * this.env.gridSize + this.env.gridSize / 2
      )
    }

    // 旋转身体到对准下一路径点
    // this.rotate = this.p.lerp(this.rotate, (180 / this.p.PI) * this.p.atan2(nexty - bodyy, nextx - bodyx) + 90, 0.08)

    this.move()
  }
}
