import P5 from 'p5'
import Neat, { activation, Hyperparameters } from '../../NeatNetwork'

/// rgb叠加运算
const rgbMatrix = (r: number[], g: number[], b: number[]) => {
  const data = []
  if (r.length == g.length && g.length == b.length) {
    for (let i = 0; i < r.length; i++) {
      data.push(r[i] + g[i] + b[i])
    }
  }
  return data
}

const p5 = new P5(() => {})
// let isFastSpeed = true;

// class Snake {
//     /**
//      * 是否死亡
//      */
//     public dead;
//     /**
//      * 适应度
//      */
//     public fitness;
//     /**
//      * 蛇段
//      */
//     public numSegments;
//     /**
//      * 蛇方向
//      */
//     public direction;
//     /**
//      * 蛇初始X坐标
//      */
//     public xStart;
//     /**
//      * 蛇初始Y坐标
//      */
//     public yStart;
//     /**
//      * 蛇长
//      */
//     public diff;
//     /**
//      * 蛇头x坐标
//      */
//     public xCor;
//     /**
//      * 蛇头Y坐标
//      */
//     public yCor;
//     /**
//      * 分数
//      */
//     public score;
//     /**
//      * 血量
//      */
//     public blood;
//     /**
//      * 食物X坐标
//      */
//     public xFruit;
//     /**
//      * 食物Y坐标
//      */
//     public yFruit;
//     /**
//      * 上一次的距离
//      */
//     public currenDis;
//     /**
//      * 当前距离
//      */
//     public dist;
//     /**
//      * 蛇+食物颜色
//      */
//     public color;

//     constructor() {
//         this.dead = false;
//         this.fitness = 0;

//         // 蛇被分为几小段，在每次调用 draw() 时进行绘制和编辑
//         this.numSegments = 10;
//         this.direction = 1;

//         //得到未处理的坐标
//         var noX = Math.floor(Math.random() * p5.width);
//         var noy = Math.floor(Math.random() * p5.height);

//         this.xStart = noX - (noX % 10);
//         this.yStart = noy - (noy % 10);
//         this.diff = 10;

//         this.xCor = [];
//         this.yCor = [];
//         //蛇分数
//         this.score = 0;
//         //蛇血量 10血
//         this.blood = 10;
//         this.fitness = 0;
//         this.xFruit = 0;
//         this.yFruit = 0;
//         //上一次的距离
//         this.currenDis = Number.MAX_VALUE;
//         //当前距离
//         this.dist = Number.MAX_VALUE;

//         this.color = this.randomColor();

//         this.updateFruitCoordinates();

//         for (let i = 0, len = this.numSegments; i < len; i++) {
//             this.xCor.push(this.xStart + i * this.diff);
//             this.yCor.push(this.yStart);
//         }
//     }

//     randomColor() {
//         //得到随机的颜色值
//         var r = Math.floor(Math.random() * 256);
//         var g = Math.floor(Math.random() * 256);
//         var b = Math.floor(Math.random() * 256);
//         return [r, g, b];
//     }

//     show() {
//         if (!this.dead) {

//             p5.stroke(this.color[0], this.color[1], this.color[2], 200);
//             for (let i = 0, len = this.numSegments - 1; i < len; i++) {
//                 //需要分别画线，正常的画线和不正常的画线

//                 p5.point(this.xCor[i], this.yCor[i]);

//                 // if(i+1 != this.xCor.length && i-1 != 0) {
//                 //     //绘制横轴
//                 //     if(this.xCor[i] + this.diff == this.xCor[i+1] && this.xCor[i] - this.diff == this.xCor[i-1] || this.yCor[i] + this.diff == this.yCor[i+1] && this.yCor[i] - this.diff == this.yCor[i-1]) {
//                 //         line(this.xCor[i], this.yCor[i], this.xCor[i + 1], this.yCor[i + 1]);
//                 //     }
//                 //     else  {
//                 //         line(this.xCor[i], this.yCor[i], this.xCor[i + 1], this.yCor[i + 1]);
//                 //     }
//                 //     //绘制竖轴
//                 //     // if() {
//                 //     //     line(this.xCor[i], this.yCor[i], this.xCor[i + 1], this.yCor[i + 1]);
//                 //     // }else {
//                 //     //     // line(this.xCor[i], this.yCor[i], this.xCor[i + 1], this.yCor[i + 1]);
//                 //     // }

//                 // }
//             }
//         }
//     }

//     move(m: number) {
//         if (!this.dead) {
//             if (
//                 (this.direction === 0 && m === 2) ||
//                 (this.direction === 0 && m === 3) ||
//                 (this.direction === 1 && m === 2) ||
//                 (this.direction === 1 && m === 3)
//             ) {
//                 //只能向左走或者向右走
//                 this.direction = m;
//             } else if (
//                 (this.direction === 2 && m === 0) ||
//                 (this.direction === 2 && m === 1) ||
//                 (this.direction === 3 && m === 0) ||
//                 (this.direction === 3 && m === 1)
//             ) {
//                 //只能向上走或者向下走
//                 this.direction = m;
//             }
//         }
//     }

//     //更新蛇坐标
//     updateSnakeCoordinates() {
//         for (let i = 0, len = this.numSegments - 1; i < len; i++) {
//             this.xCor[i] = this.xCor[i + 1];
//             this.yCor[i] = this.yCor[i + 1];
//         }
//         switch (this.direction) {
//             case 0:
//                 //向左
//                 this.xCor[this.numSegments - 1] =
//                     this.xCor[this.numSegments - 2] - this.diff;
//                 this.yCor[this.numSegments - 1] = this.yCor[this.numSegments - 2];
//                 break;
//             case 1:
//                 //向右
//                 this.xCor[this.numSegments - 1] =
//                     this.xCor[this.numSegments - 2] + this.diff;
//                 this.yCor[this.numSegments - 1] = this.yCor[this.numSegments - 2];
//                 break;
//             case 2:
//                 //向上
//                 this.xCor[this.numSegments - 1] = this.xCor[this.numSegments - 2];
//                 this.yCor[this.numSegments - 1] =
//                     this.yCor[this.numSegments - 2] - this.diff;
//                 break;
//             case 3:
//                 //向下
//                 this.xCor[this.numSegments - 1] = this.xCor[this.numSegments - 2];
//                 this.yCor[this.numSegments - 1] =
//                     this.yCor[this.numSegments - 2] + this.diff;
//                 break;
//         }
//         //蛇超出边界则回到另一边
//         if (this.xCor[this.xCor.length - 1] > p5.width) {
//             this.xCor[this.xCor.length - 1] = 0;
//         } else if (this.xCor[this.xCor.length - 1] < 0) {
//             this.xCor[this.xCor.length - 1] = p5.width - (p5.width % 10);
//         }

//         if (this.yCor[this.yCor.length - 1] > p5.height) {
//             this.yCor[this.yCor.length - 1] = 0;
//         } else if (this.yCor[this.yCor.length - 1] < 0) {
//             this.yCor[this.yCor.length - 1] = p5.height - (p5.height % 10);
//         }
//     }

//     checkGameStatus() {
//         //如果蛇吃到自己就死亡

//         if (this.checkSnakeCollision() || this.blood <= 0) {
//             this.dead = true;
//         }

//         // if (
//         //     this.xCor[this.xCor.length - 1] > width ||
//         //     this.xCor[this.xCor.length - 1] < 0 ||
//         //     this.yCor[this.yCor.length - 1] > height ||
//         //     this.yCor[this.yCor.length - 1] < 0 ||
//         //     this.checkSnakeCollision()
//         // ) {
//         //     this.dead = true
//         //     // noLoop();
//         // }
//     }

//     checkSnakeCollision() {
//         const snakeHeadX = this.xCor[this.xCor.length - 1];
//         const snakeHeadY = this.yCor[this.yCor.length - 1];
//         for (let i = 0, len = this.xCor.length - 1; i < len; i++) {
//             if (this.xCor[i] === snakeHeadX && this.yCor[i] === snakeHeadY) {
//                 return true;
//             }
//         }
//     }

//     checkForFruit() {
//         p5.stroke(this.color[0], this.color[1], this.color[2], 200);
//         if (!this.dead) {
//             p5.point(this.xFruit, this.yFruit);
//         }
//         if (
//             this.xCor[this.xCor.length - 1] === this.xFruit &&
//             this.yCor[this.yCor.length - 1] === this.yFruit
//         ) {
//             //加分
//             this.score += 500;
//             //加血
//             if (this.blood + 5 > 10) {
//                 this.blood = 10;
//             } else {
//                 this.blood += 5;
//             }

//             this.xCor.unshift(this.xCor[0]);
//             this.yCor.unshift(this.yCor[0]);
//             this.numSegments++;
//             this.updateFruitCoordinates();
//         }
//     }

//     updateFruitCoordinates() {
//         /*
//                           这里的数学逻辑是因为我希望这个点位于 100 和 width-100 之间，并四舍五入到
//                           10 的倍数 ，因为蛇以 10 的倍数移动。
//                         */

//         this.xFruit = p5.floor(p5.random(10, (p5.width - 100) / 10)) * 10;
//         this.yFruit = p5.floor(p5.random(10, (p5.height - 100) / 10)) * 10;
//     }

//     update() {
//         //检查死亡
//         this.checkGameStatus();

//         //更新位置
//         this.updateSnakeCoordinates();

//         //更新吃食物
//         this.checkForFruit();

//         const dx = Math.abs(this.xCor[this.xCor.length - 1] - this.xFruit);
//         const dy = Math.abs(this.yCor[this.yCor.length - 1] - this.yFruit);
//         const num = (this.dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
//         if (this.dist < this.currenDis) {
//             //蛇离食物越近加分
//             this.currenDis = num;
//             this.score += 1;
//             // console.log(this.score);
//         } else {
//             //越来越远扣分
//             this.currenDis = num;
//             this.score -= 1;
//         }
//     }

//     inputss() {
//         return [
//             //蛇x
//             this.xCor[this.xCor.length - 1],
//             //蛇y
//             this.yCor[this.yCor.length - 1],
//             //食物x
//             this.xFruit,
//             //食物y
//             this.yFruit,
//             //蛇的方向
//             this.direction,
//             //蛇的长度
//             this.numSegments,
//             //血量
//             this.blood,
//             //距离食物距离
//             this.dist,
//         ];
//     }
// }

let psize = 150 //数量 150
let snakes: any[] = []
let hyperparams = new Hyperparameters()
hyperparams.default_activation = activation.TANH
let neat = new Neat(8, 1, psize, hyperparams).import()

// 拟人眼视觉
// R -> 归一化 -> 归一化R -> |——————————————————|
// G -> 归一化 -> 归一化G -> | 矩阵相乘得到输入  | -> 隐藏层权重计算 -> 输出结果
// B -> 归一化 -> 归一化B -> |——————————————————|
// x --------------------->
// y --------------------->

let eye = {
  r: [1],
  g: [0],
  b: [0],
}

const input = rgbMatrix(eye.r, eye.g, eye.b)
console.log(input)



// let config = new NeatConfig();
// (config.model = [
//   { nodeCount: 8, type: "input" },
//   { nodeCount: 1, type: "output", activationfunc: activation.RELU },
// ]),
//   (config.populationSize = psize);

p5.setup = () => {
  let home: Element | null = document.querySelector('#home')
  if (home == null) return console.log('找不到指定画布ID')
  let myCanvas = p5.createCanvas(home.clientWidth, home.clientHeight - 10)
  myCanvas.parent('home')
  p5.strokeWeight(4)
}

p5.draw = () => {
  p5.rect(10, 10, p5.width, p5.height)
}

// p5.draw = () => {
//     //运行次数约等于计算次数，可以加速
//     for (let b = 0, len = isFastSpeed ? 10 : 1; b < len; b++) {
//         p5.background(40, 44, 52);

//         let finish = true;
//         for (let i = 0, len = neat.get_genomes().length; i < len; i++) {

//             const desicions = neat.get_genomes()[i].forward(snakes[i].inputss())

//             //如果是空的不做操作
//             if (desicions === null || desicions === undefined) break;

//             if (desicions[0] <= -0.5) {
//                 // if (snakes[i].direction === 1) {
//                 snakes[i].move(0);
//                 // }
//             } else if (desicions[0] <= 0) {
//                 // if (snakes[i].direction === 0) {
//                 snakes[i].move(1);
//                 // }
//             } else if (desicions[0] <= 0.5) {
//                 // if (snakes[i].direction === 3) {
//                 snakes[i].move(2);
//                 // }
//             } else if (desicions[0] <= 1) {
//                 // if (snakes[i].direction === 2) {
//                 snakes[i].move(3);
//                 // }
//             }

//             //更新蛇的状态以及位置信息
//             snakes[i].update();
//         }

//         // for (let i = 0, len = neat.get_genomes().length; i < len; i++) {

//         // }

//         for (let i = 0, len = neat.get_genomes().length; i < len; i++) {
//             //检查死亡因为有跳出所以不能放到同一个循环里
//             if (!snakes[i].dead) {
//                 finish = false;
//                 break;
//             }
//         }

//         //全体死亡
//         if (finish) {
//             for (let i = 0, len = neat.get_genomes().length; i < len; i++) {
//                 neat.get_genomes()[i].set_fitness(snakes[i].score)
//                 snakes[i] = new Snake();
//             }

//             if (neat.should_evolve()) {
//                 neat.next_iteration();
//                 console.log(neat);
//                 console.log(neat._global_best);
//             }
//         }

//     }

//     for (let i = 0, len = neat.get_genomes().length; i < len; i++) {
//         snakes[i].show();
//     }
// };

// p5.keyPressed = (e) => {
//     console.log(e.keyCode)
//     //按下p保存
//     if (e.keyCode === 80) {
//         neat.export(`snake-[${Date.now()}]`)
//     } else if (e.keyCode === 79) {
//         //按下o进行加速或者正常速度运行
//         if (isFastSpeed) {
//             isFastSpeed = false;

//         } else {
//             isFastSpeed = true;
//         }
//     } else if (e.keyCode === 76) {
//         //按下l打开训练好的模型

//     }

// }
