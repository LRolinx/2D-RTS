import P5 from 'p5'
import { Env, Select } from './env'
const p5 = new P5(() => {})
let env: Env | undefined = undefined
let pageName = 'main'
let initSchedule = 0

// 绘制初始化加载画面
const initLoading = () => {
  p5.background(30, 30, 30)
  p5.textSize(86)
  p5.fill(89, 115, 255)
  p5.text('2D', p5.width / 2 - 60, p5.height / 2)
  p5.fill(234, 237, 255)
  p5.text('RTS', p5.width / 2 + 60, p5.height / 2)
  p5.rect(p5.width / 2 - 60, p5.height / 2 + 10, 270, 10)
  p5.fill(89, 115, 255)
  p5.rect(p5.width / 2 - 60, p5.height / 2 + 10, (270 / 100) * initSchedule, 10)
}

p5.setup = () => {
  document.body.style.background = 'rgb(19, 21, 32)'
  let homeElement: Element | null = document.querySelector('#home')
  if (homeElement == null) return console.log('找不到指定画布ID')
  let myCanvas = p5.createCanvas(homeElement.clientWidth, homeElement.clientHeight)
  myCanvas.parent('home')

  env = new Env(p5)
  // 创建家
  //   env.home = new Home(p5, env)

  let initTime: any = setInterval(() => {
    if (initTime != void 0 && initSchedule == 100) {
      clearInterval(initTime)
      initTime = null
      pageName = 'main'
      return
    }
    initSchedule += 1
  }, 30)
}

p5.draw = () => {
  switch (pageName) {
    case 'init':
      initLoading()
      break
    case 'main':
      p5.background(30, 30, 30)
      if (env != void 0) {
        env.draw()
      }
      break
  }
}

p5.mouseClicked = (e) => {
//   console.log(e)
  if (env == void 0) return
  env.select = new Select(p5.mouseX, p5.mouseY, env?.unit[1])
  //遍历对象看有没有对象坐标位置
  // for(let i = 0 ; i < env.unit.length;i++) {
  //     env.unit
  // }
  env.select.object.setPath(p5.mouseX, p5.mouseY)
}
