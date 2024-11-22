import p5 from 'p5'
import Matter from 'matter-js'
import { RtsHome } from './unit/home'
import { Water } from './tile/water'
import { TestTank } from './unit/test_tank'

export class Select {
  x: number = 0
  y: number = 0
  object: any = undefined
  op = 255
  hideOp = true

  constructor(x: number, y: number, object?: any) {
    this.x = x
    this.y = y
    this.object = object
  }
}

/// 环境
export class Env {
  p: p5 | undefined = undefined

  gridSize: number = 18
  map: number[][] = []
  unit: any[] = []
  select?: Select = undefined

  constructor(p: p5) {
    this.p = p

    this.crateMap()
    // 创建家
    this.unit.push(new RtsHome(p, this))
    // 创建工人
    this.unit.push(new TestTank(p, this))
    // this.unit.push(new RtsWorker(p, this))

    // const Engine = Matter.Engine,
    //   Render = Matter.Render,
    //   Runner = Matter.Runner,
    //   Bodies = Matter.Bodies,
    //   Composite = Matter.Composite

    // // 创建一个物理引擎
    // const engine = Engine.create()

    // // 创建一个渲染器
    // const render = Render.create({
    //   element: document.body,
    //   engine: engine,
    //   options: {
    //     pixelRatio: 1, // 设置像素比
    //     background: '#fafafa', // 全局渲染模式时背景色
    //     wireframeBackground: '#222', // 线框模式时背景色
    //     hasBounds: false,
    //     wireframes: true, // 线框模式
    //     showSleeping: true, // 刚体睡眠状态
    //     showDebug: false, // Debug 信息
    //     showBroadphase: false, // 粗测阶段
    //     showBounds: false, // 刚体的界限
    //     showVelocity: false, // 移动刚体时速度
    //     showCollisions: false, // 刚体碰撞点
    //     showSeparations: false, // 刚体分离
    //     showAxes: false, // 刚体轴线
    //     showPositions: false, // 刚体位置
    //     showAngleIndicator: false, // 刚体转角指示
    //     showIds: false, // 显示每个刚体的 ID
    //     showVertexNumbers: false, // 刚体顶点数
    //     showConvexHulls: false, // 刚体凸包点
    //     showInternalEdges: false, // 刚体内部边界
    //     showMousePosition: false, // 鼠标约束线
    //   },
    // })
    // // 创建一个方块和一个地面
    // var box = Bodies.rectangle(400, 200, 80, 80)
    // var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true })

    // // 将他们加入到这个物理引擎中
    // Composite.add(engine.world, [box, ground])

    // // 运行这个渲染器
    // Render.run(render)

    // // 创建一个运行环境，类似于U3D的Update函数
    // var runner = Runner.create()

    // // 开始渲染运行
    // Runner.run(runner, engine)


	// const world = Matter.World.create();

  }

  // 创建地图
  crateMap = () => {
    // 创建地图 0陆地 1障碍物
    const mapSize = Math.round(this.p.height / this.gridSize)
    this.map = Array.from({ length: mapSize }, () => Array(mapSize).fill(0))
    // 种子设定完成地图不会有任何变化
    this.p?.randomSeed(0)
    for (let x = 0; x < this.map.length; x++) {
      for (let y = 0; y < this.map[x].length; y++) {
        this.map[x][y] = Math.round(this.p?.random(0, 0.9))
      }
    }

    for (let i = 0; i < 4; i++) {
      this.SmoothMap()
    }

    console.log(this.map)
  }

  // 消除地图孤立点
  GetSurroundingWalls = (posX: number, posY: number) => {
    const mapSize = Math.round(this.p.height / this.gridSize)
    let wallCount: number = 0
    for (let i = posX - 1; i <= posX + 1; i++) {
      for (let j = posY - 1; j <= posY + 1; j++) {
        if (i >= 0 && i < mapSize && j >= 0 && j < mapSize) {
          if (i != posX || j != posY) wallCount += this.map[i][j]
        } else {
          wallCount++
        }
      }
    }
    return wallCount
  }

  // 计算九宫格内墙数量
  SmoothMap = () => {
    const mapSize = Math.round(this.p.height / this.gridSize)
    for (let i = 0; i < mapSize; i++) {
      for (let j = 0; j < mapSize; j++) {
        let surroundingTiles: number = this.GetSurroundingWalls(i, j)
        if (surroundingTiles > 4) this.map[i][j] = 1
        else if (surroundingTiles < 4) this.map[i][j] = 0
      }
    }
  }

  // 绘制地图
  drawMap = () => {
    if (this.p == void 0) return
    this.p.strokeWeight(1)
    this.p.stroke(43, 43, 43)
    for (let x = 0; x < this.map.length; x++) {
      this.p.line(x * this.gridSize, 0, x * this.gridSize, this.p.height)
      this.p.line(0, x * this.gridSize, this.p.height, x * this.gridSize)
    }
    this.p.stroke(89, 115, 255)
    this.p.line(0, 0, 0, this.p.height)
    this.p.line(this.p.height, 0, this.p.height, this.p.height)
    this.p.line(this.p.height, this.p.height, 0, this.p.height)
    this.p.line(0, this.p.height, 0, 0)

    for (let x = 0; x < this.map.length; x++) {
      for (let y = 0; y < this.map[x].length; y++) {
        if (this.map[x][y] == 1) {
          this.p.stroke(0, 0, 0)
          this.p.fill(0, 0, 0)
          this.p.rect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize)
        }
      }
    }
  }

  // 绘制
  draw = () => {
    // 绘制地图
    this.drawMap()

    new Water(this.p, this, 180, 180).draw()
    // new AirBase(this.p, this, 180, 180).draw()

    // 绘制对象
    this.unit.forEach((x) => {
      x.draw()
    })

    // 绘制选择
    this.p?.stroke(0, 0, 0)
    if (this.select != void 0) {
      if (this.select.hideOp) {
        this.select.op -= 15
        if (this.select.op <= 0) {
          this.select.hideOp = false
        }
      } else {
        this.select.op += 15
        if (this.select.op >= 255) {
          this.select.hideOp = true
        }
      }
      //   this.select.hideOp = !this.select.hideOp

      if (this.select.object != void 0) {
        // 如果是对象则锁定对象
        this.select.x = this.select.object.x
        this.select.y = this.select.object.y

        // 绘制对象属性
        this.p?.textSize(18)
        this.p?.fill(255, 255, 255)
        this.p?.text('单位属性', this.p.height + 10, 18)
        this.p?.textSize(12)
        this.p?.text(`最大血量:${this.select.object.maxBlood}`, this.p.height + 10, 38)
        this.p?.text(`当前血量:${this.select.object.blood}`, this.p.height + 10, 58)
      } else {
        // 地图属性
        // 绘制对象属性
        this.p?.textSize(18)
        this.p?.fill(255, 255, 255)
        this.p?.text('地图属性', this.p.height + 10, 18)
        // this.p?.textSize(12)
        // this.p?.text(`最大血量:${this.select.object.maxBlood}`, this.p.height+10, 38)
        // this.p?.text(`当前血量:${this.select.object.blood}`, this.p.height+10, 58)
      }

      // 绘制选中框
      this.p?.stroke(0, 255, 0, this.select.op)
      this.p?.line(this.select.x, this.select.y, this.select.x + this.gridSize / 3, this.select.y)
      this.p?.line(this.select.x, this.select.y, this.select.x, this.select.y + this.gridSize / 3)
      this.p?.line(this.select.x + this.gridSize, this.select.y, this.select.x + this.gridSize - this.gridSize / 3, this.select.y)
      this.p?.line(this.select.x + this.gridSize, this.select.y, this.select.x + this.gridSize, this.select.y + this.gridSize / 3)
      this.p?.line(this.select.x, this.select.y + this.gridSize, this.select.x, this.select.y + this.gridSize - this.gridSize / 3)
      this.p?.line(this.select.x, this.select.y + this.gridSize, this.select.x + this.gridSize / 3, this.select.y + this.gridSize)
      this.p?.line(this.select.x + this.gridSize, this.select.y + this.gridSize, this.select.x + this.gridSize, this.select.y + this.gridSize - this.gridSize / 3)
      this.p?.line(this.select.x + this.gridSize, this.select.y + this.gridSize, this.select.x + this.gridSize - this.gridSize / 3, this.select.y + this.gridSize)
    }
  }
}
