import p5 from 'p5'
import { RtsHome } from './unit/home'
import { MapNode } from './pathfinding'
import { RtsWorker } from './unit/worker'

/// 环境
export class Env {
  p: p5 | undefined = undefined
  gridSize: number = 18
  map: number[][] = []
  unit: any[] = []

  constructor(p: p5) {
    this.p = p

    this.crateMap()
    // 创建家
    this.unit.push(new RtsHome(p, this))
    // 创建工人
    this.unit.push(new RtsWorker(p, this))
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

  // 运行
  run = () => {
    this.unit.forEach((x) => {
      x.draw()

	  if(x.move != void 0) {
		// 单位移动
		x.move()
	  }
    })

	// for(let i = 0 ;i < this.unit.length;i++) {
	// 	const _unit = this.unit[i]
	// 	_unit.draw()
	// }
  }
}
