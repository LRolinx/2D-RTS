import { Env } from './env'

export class MapNode {
  x: number
  y: number
  g: number // 从起点到当前节点的实际代价
  h: number // 从当前节点到终点的预估代价
  f: number // 总代价 f = g + h
  parent: MapNode | null

  constructor(x: number, y: number, g: number, h: number, parent: MapNode | null) {
    this.x = x
    this.y = y
    this.g = g
    this.h = h
    this.f = g + h
    this.parent = parent
  }
}

function heuristic(a: MapNode, b: MapNode): number {
  const dx = Math.abs(a.x - b.x)
  const dy = Math.abs(a.y - b.y)
  return Math.max(dx, dy) // 曼哈顿距离的替代，考虑对角线
}

export function aStarSearch(env: Env, start: MapNode, end: MapNode): MapNode[] | null {
  const openList: MapNode[] = [start]
  const closedList: Set<string> = new Set()

  while (openList.length > 0) {
    // 找到 F 值最小的节点
    openList.sort((a, b) => a.f - b.f)
    const currentNode = openList.shift()!
    const currentKey = `${currentNode.x},${currentNode.y}`

    if (currentNode.x === end.x && currentNode.y === end.y) {
      // 构建路径
      const path: MapNode[] = []
      let curr = currentNode
      while (curr) {
        path.unshift(curr)
        curr = curr.parent as MapNode
      }
      return path
    }

    closedList.add(currentKey)

    // 获取邻居节点
    const neighbors = [
      { x: currentNode.x - 1, y: currentNode.y }, // 左
      { x: currentNode.x + 1, y: currentNode.y }, // 右
      { x: currentNode.x, y: currentNode.y - 1 }, // 上
      { x: currentNode.x, y: currentNode.y + 1 }, // 下
      { x: currentNode.x - 1, y: currentNode.y - 1 }, // 左上
      { x: currentNode.x + 1, y: currentNode.y - 1 }, // 右上
      { x: currentNode.x - 1, y: currentNode.y + 1 }, // 左下
      { x: currentNode.x + 1, y: currentNode.y + 1 }, // 右下
    ]

    for (const neighbor of neighbors) {
      const { x, y } = neighbor
      const key = `${x},${y}`

      if (x < 0 || y < 0 || x >= env.map.length || y >= env.map[0].length || env.map[x][y] === 1 || closedList.has(key)) {
        continue // 跳过无效或已处理的节点
      }

      const g = currentNode.g + (neighbor.x === currentNode.x || neighbor.y === currentNode.y ? 1 : Math.sqrt(2))

      const h = heuristic(new MapNode(x, y, 0, 0, null), end)
      const neighborNode = new MapNode(x, y, g, h, currentNode)

      // 如果节点在 openList 中，但有更低的 G 值，则更新
      const existingNode = openList.find((node) => node.x === x && node.y === y)
      if (existingNode && existingNode.g <= g) {
        continue
      }

      openList.push(neighborNode)
    }
  }

  return null // 找不到路径
}
