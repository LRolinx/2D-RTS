/*
 * █████▒█      ██  ▄████▄   ██ ▄█▀     ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒      ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░      ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄      ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄     ██████╔╝╚██████╔╝╚██████╔╝
 * ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒     ╚═════╝  ╚═════╝  ╚═════╝
 * ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
 * ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
 * ░     ░ ░      ░  ░
 * Copyright 2022 LRolinx.
 * <p>
 *  -Neat拓扑神经网络类
 * </p>
 * @author LRolinx
 * @create 2021-12-22 15:10
 */

// 计算方法
/**
 * Set并集
 * @param a
 * @param b
 * @returns
 */
export function union<T>(a: Set<T>, b: Set<T>): Set<T> {
  const unionSet: Set<T> = new Set();
  a.forEach((value) => unionSet.add(value));
  b.forEach((value) => unionSet.add(value));
  return unionSet;
}

/**
 * Set交集
 * @param a
 * @param b
 * @returns
 */
export function intersection<T>(a: Set<T>, b: Set<T>) {
  // 声明交集变量
  const intersectionSet: Set<T> = new Set();

  a.forEach((value) => {
    if (b.has(value)) {
      intersectionSet.add(value);
    }
  });
  return intersectionSet;
}

/**
 * Set差集
 * @param a
 * @param b
 * @returns
 */
export function difference<T>(a: Set<T>, b: Set<T>) {
  // 声明差集变量
  const differenceSet: Set<T> = new Set();
  // 遍历当前实例中的集合
  a.forEach((value) => {
    if (!b.has(value)) {
      differenceSet.add(value);
    }
  });
  return differenceSet;
}

/**
 * 返回最大的值
 * @param a 
 * @param b 
 * @param key 
 * @returns 
 */
export const max = (a: Set<any>, b: Set<any>, key = 'max'): Set<any> => {
  if (key == 'len') {
    if (a.size > b.size) {
      return a;
    }
    return b;
  }
  return new Set();
}

/**
 * 计算所有数字的合并
 * @param a 
 * @returns 
 */
export const sum = (a: number[]): number => {
  let num = 0;
  for (const i of a) {
    num += i;
  }
  return num;
}

export function sample(a: Genome[], n: number) {
  if (n > a.length) return [];
  const obj: Genome[] = [];
  for (const i of a) {
    obj.push(copy(i));
  }

  for (let i = obj.length; i > n; i--) {
    const len = range(0, obj.length - 1);
    obj.splice(len, 1);
  }

  return obj;
}

/**
 * 随机选择
 * @param o
 * @returns
 */
export function choice(o: any[]) {
  const index = Math.floor(Math.random() * o.length);
  return o[index];
}

/**
 * 根据概率选择指定数量的数组
 * @param o 对象
 * @param w 权重
 * @param k 输出
 * @returns
 */
export function choices(o: any[], w: any[] = [], k = 1) {
  let ls = [];
  const arr = [];

  for (const n in w) {
    for (let i = 0; i < w[n] * 100; i++) {
      if (ls.length != k * (sum(w) * 100)) {
        ls.push(n);
      }
    }
  }

  //打乱数组
  ls = shuffle(ls);

  for (let i = 0; i < k; i++) {
    const r = range(0, ls.length - 1);
    arr.push(o[ls[r]]);
    ls.splice(r, 1);
  }

  return arr;
}

/**
 * 洗牌
 * @param arr
 * @returns
 */
export function shuffle(arr: any[]) {
  const res = [];
  let randomIndex = 0;
  // 条件判断,只要arr.length > 0 就走while循环里面的
  while (arr.length > 0) {
    randomIndex = Math.floor(Math.random() * arr.length); // 得到数组范围内下标
    res.push(arr[randomIndex]);
    arr.splice(randomIndex, 1);
  }
  return res;
}

/**
 * 浅拷贝 a->b
 * @param obj
 * @param objb
 * @returns
 */
export function copy(obj: any) {
  const newobj = {
    __proto__: Object.getPrototypeOf(obj),
    ...obj,
  };

  return newobj;
}

/**
 * 深拷贝 a->b
 * @param obj
 */
export function deepcopy(obj: any): any {
  let newobj: any = {};
  if (obj != undefined) {
    if (obj.constructor.name == 'Genome') {
      newobj = new Genome(obj._inputs, obj._outputs, obj._default_activation);
    }
    if (obj.constructor.name == 'Edge') {
      newobj = new Edge(obj.weight);
    }
    if (obj.constructor.name == 'Node') {
      newobj = new Node(obj.activation);
    }
  }
  // if (!(Object.prototype === Object.getPrototypeOf(obj))) {
  //   return new Error('传入参数***_object***类型错误');
  // }
  for (const key in obj) {
    if (Object.prototype === Object.getPrototypeOf(obj[key])) {
      newobj[key] = deepcopy(obj[key]);
    } else {
      newobj[key] = obj[key];
    }
  }

  return newobj;
}

/**
 * 生成范围随机小数*不包含min和max
 * @param min
 * @param max
 * @returns
 */
export function uniform(min = 0, max = 1): number {
  const Range = max - min;
  const Rand = Math.random();
  return min + Rand * Range;
}

/**
 * 生成范围随机小数*包含min和max
 * @param min 
 * @param max 
 */
export const fullClose = (min = 0, max = 1) => {
  var result = Math.random() * (max + 1 - min) + min;
  while (result > max) {
    result = Math.random() * (max + 1 - min) + min;
  }
  return result;
}

/**
 * 生成范围随机整数*包含min和max
 * @param min
 * @param max
 * @returns
 */
export function range(min = 0, max = 1): number {
  // let seed = new Date().getTime();
  // seed = (seed * 9301 + 49297) % 233280;
  // const rnd = seed / 233280.0;
  // return min + rnd * (max - min);
  const Range = max - min;
  const Rand = Math.random();
  return min + Math.round(Rand * Range);
}

export function chain(a: number[], b: number[]): number[] {
  const num = [];
  for (let i = a[0]; i < a[1]; i++) {
    num.push(i);
  }
  for (let i = b[0]; i < b[1]; i++) {
    num.push(i);
  }
  return num;
}

function genomic_distance(
  a: Genome,
  b: Genome,
  distance_weights: { [key: string]: number },
) {
  //计算两个基因组之间的基因组距离。
  const a_edges = new Set(Object.keys(a._edges));
  const b_edges = new Set(Object.keys(b._edges));

  //不区分脱节和多余
  const matching_edges = intersection(a_edges, b_edges);
  const disjoint_edges = union(
    difference(a_edges, b_edges),
    difference(b_edges, a_edges),
  );
  const N_edges = max(a_edges, b_edges, 'len').size;
  const N_nodes = Math.min(a._max_node, b._max_node);

  let weight_diff = 0;

  for (const i in matching_edges) {
    weight_diff += Math.abs(a._edges[i].weight - b._edges[i].weight);
  }

  let bias_diff = 0;
  for (let i = 0; i < N_nodes; i++) {
    bias_diff += Math.abs(a._nodes[i].bias - b._nodes[i].bias);
  }

  const t1 = (distance_weights['edge'] * disjoint_edges.size) / N_edges;
  const t2 = (distance_weights['weight'] * weight_diff) / matching_edges.size;
  const t3 = (distance_weights['bias'] * bias_diff) / N_nodes;
  return t1 + t2 + t3;
}

function genomic_crossover(a: Genome, b: Genome) {
  // 培育两个基因组并返回孩子。 匹配基因
  // 是随机继承的，而不相交的基因是继承的
  // 来自 fitter 父级。

  //儿童模板基因组
  const child = new Genome(a._inputs, a._outputs, a._default_activation);
  const a_in = new Set(Object.keys(a._edges));
  const b_in = new Set(Object.keys(b._edges));

  //从随机父母继承同源基因
  for (const i of a_in.keys()) {
    const parent = choice([a, b]);
    child._edges[i] = deepcopy(parent._edges[i]);
  }

  //从更合适的父母那里继承不相交/多余的基因
  if (a._fitness > b._fitness) {
    for (const i of union(a_in, b_in).keys()) {
      child._edges[i] = deepcopy(a._edges[i]);
    }
  } else {
    for (const i of union(b_in, a_in).keys()) {
      child._edges[i] = deepcopy(b._edges[i]);
    }
  }

  //计算最大节点
  child._max_node = 0;
  for (const i in child._edges) {
    const sp = i.split(',');
    const current_max = Math.max(parseInt(sp[0]), parseInt(sp[1]));
    child._max_node = Math.max(child._max_node, current_max);
  }

  child._max_node += 1;

  //继承节点
  for (let n = 0; n < child._max_node; n++) {
    let inherit_from: Genome[] = [];
    if (n < Object.keys(a._nodes).length) {
      inherit_from.push(a);
    }
    if (n < Object.keys(b._nodes).length) {
      inherit_from.push(b);
    }

    inherit_from = shuffle(inherit_from);

    const parent: Genome =
      inherit_from.filter((x) => x._fitness).length == 0
        ? inherit_from[0]
        : inherit_from.filter((x) => x._fitness)[0];
    child._nodes[n] = deepcopy(parent._nodes[n]);
  }

  child.reset();
  return child;
}

export const activation = {
  RELU: (x: number): number => {
    return x > 0 ? x : 0
  },
  TANH: (x: number): number => {
    return Math.tanh(x)
  },
  SIGMOID: (x: number): number => {
    return 1 / (1 + Math.exp(- x))
  },
  LEAKY_RELU: (x: number): number => {
    return x > 0 ? x : .01 * x
  },
  SOFTPLUS: (x: number): number => {
    return Math.log(1 + Math.exp(x))
  },
  SOFTMAX: (x: any[]): any[] => {
    let e = 0,
      s = [];
    for (let s = 0, n = x.length; s < n; s++) e += Math.exp(x[s]);
    for (let n = 0, o = x.length; n < o; n++) s.push(Math.exp(x[n]) / e);
    return s
  }
}

/**
 * 超参数
 */
export class Hyperparameters {
  delta_threshold: number;
  distance_weights: { [key: string]: number };
  default_activation: (x: any) => number | any[];
  max_fitness: number;
  max_generations: number;
  max_fitness_history: number;
  breed_probabilities: { [key: string]: number };
  mutation_probabilities: { [key: string]: number };

  constructor() {
    this.delta_threshold = 1.5;
    this.distance_weights = {
      edge: 1.0,
      weight: 1.0,
      bias: 1.0,
    };
    this.default_activation = activation.SIGMOID;

    this.max_fitness = Number.MAX_VALUE;
    this.max_generations = Number.MAX_VALUE;
    this.max_fitness_history = 30;

    this.breed_probabilities = {
      asexual: 0.5,
      sexual: 0.5,
    };
    this.mutation_probabilities = {
      node: 0.01,
      edge: 0.09,
      weight_perturb: 0.4,
      weight_set: 0.1,
      bias_perturb: 0.3,
      bias_set: 0.1,
    };
  }
}

/**
 * 权重
 */
export class Edge {
  weight: number;
  enabled: boolean;

  constructor(weight: number) {
    this.weight = weight;
    this.enabled = true;
  }
}

/**
 * 节点
 */
export class Node {
  output: number;
  bias: number;
  activation: (x: any) => number | any[];

  constructor(activation: (x: any) => number | any[]) {
    this.output = 0;
    this.bias = 0;
    this.activation = activation;
  }

  // activation() {
  //   //激活？
  // }
}

/**
 * 基因
 */
export class Genome {
  _inputs: number;
  _outputs: number;
  _unhidden: number;
  _max_node: number;
  _edges: { [key: string]: Edge };
  _nodes: { [key: number]: Node };
  _default_activation: (x: any) => number | any[];
  _fitness: number;
  _adjusted_fitness: number;

  constructor(inputs: number, outputs: number, default_activation: (x: any) => number | any[]) {
    // Nodes
    this._inputs = inputs;
    this._outputs = outputs;

    this._unhidden = inputs + outputs;
    this._max_node = inputs + outputs;

    // Structure
    this._edges = {}; //(i, j) : Edge

    this._nodes = {}; // NodeID: Node

    this._default_activation = default_activation;

    // Performance
    this._fitness = 0;
    this._adjusted_fitness = 0;
  }

  public generate() {
    // 用最少的生成这个基因组的神经网络
    // 初始拓扑，即（无隐藏节点）。 呼吁基因组
    // 创建。
    //最小初始拓扑，无隐藏层
    for (let n = 0; n < this._max_node; n++) {
      this._nodes[n] = new Node(this._default_activation);
    }

    for (let i = 0; i < this._inputs; i++) {
      for (let j = this._inputs; j < this._unhidden; j++) {
        this.add_edge(i, j, uniform(-1, 1));
      }
    }
  }

  /**
   * 输入值进行前向传播
   * @param inputs 输入
   * @returns 
   */
  forward(inputs: any[]) {
    // 评估输入并计算输出
    //    神经网络通过前向传播算法。
    if (inputs.length != this._inputs) {
      console.log('输入数量不正确');
      return;
    }

    // 设置输入值
    for (let i = 0; i < this._inputs; i++) {
      this._nodes[i].output = inputs[i];
    }

    //生成后向邻接表
    const _from: any = {};
    for (let n = 0; n < this._max_node; n++) {
      _from[n] = [];
    }

    for (const i in this._edges) {
      const sp = i.split(',');
      if (!this._edges[i].enabled) {
        continue;
      }

      // if(_from[parseInt(sp[1])] === null || _from[parseInt(sp[1])] === undefined || _from[parseInt(sp[1])] === {}) {
      //   console.log("前向->",_from,i,sp[1],sp[0]);
      //   console.log(this._edges);
      // }
      if (parseInt(sp[1]) in _from) {
        //已经有了
        _from[parseInt(sp[1])].push(parseInt(sp[0]));
      } else {
        //还没有
        _from[parseInt(sp[1])] = [];
        _from[parseInt(sp[1])].push(parseInt(sp[0]));
      }

    }

    //计算每个节点的输出值
    const ordered_nodes = chain(
      [this._unhidden, this._max_node],
      [this._inputs, this._unhidden],
    );

    for (const j of ordered_nodes) {
      let ax = 0;
      for (const i in _from[j]) {
        if (this._edges[`${i},${j}`] === undefined) {
          console.log(`触发->`);
          console.log(ordered_nodes);
          console.log(_from);
          console.log(this._edges);
          console.log([`${i},${j}`]);
        }
        ax += this._edges[`${i},${j}`].weight * this._nodes[Number(i)].output;
      }
      const node: Node = this._nodes[j];
      node.output = Number(node.activation(ax + node.bias));
    }

    const data = [];
    for (let n = this._inputs; n < this._unhidden; n++) {
      data.push(this._nodes[n].output);
    }
    return data;
  }

  /**
   * 随机突变基因组以启动变异。
   * @param probabilities 
   */
  mutate(probabilities: { [key: string]: number }) {
    if (this.is_disabled()) {
      this.add_enabled();
    }

    const population = Object.keys(probabilities);
    const weights = [];
    for (const k of population) {
      weights.push(probabilities[k]);
    }

    const choice = choices(population, weights)[0];

    if (choice == 'node') {
      this.add_node();
    } else if (choice == 'edge') {
      //元组
      const [i, j] = this.random_pair();


      this.add_edge(i, j, uniform(-1, 1));
    } else if (choice == 'weight_perturb' || choice == 'weight_set') {
      this.shift_weight(choice);
    } else if (choice == 'bias_perturb' || choice == 'bias_set') {
      this.shift_bias(choice);
    }
    this.reset();
  }

  add_node() {
    // 在随机选择的边之间添加一个新节点，
    //    禁用父边缘。
    const enabled = [];
    for (const k in this._edges) {
      if (this._edges[k].enabled) {
        enabled.push(k);
      }
    }
    const cen = choice(enabled);
    const sp = cen.split(',');
    const edge = this._edges[cen];
    edge.enabled = false;
    const new_node = this._max_node;
    this._max_node += 1;
    this._nodes[new_node] = new Node(this._default_activation);

    this.add_edge(parseInt(sp[0]), new_node, 1.0);
    this.add_edge(new_node, parseInt(sp[1]), edge.weight);
  }

  add_edge(i: number, j: number, weight: number) {
    //在现有节点之间添加新连接。
    if (`${i},${j}` in this._edges) {

      this._edges[`${i},${j}`].enabled = true;
    } else {

      this._edges[`${i},${j}`] = new Edge(weight);
    }
  }

  add_enabled() {
    //重新启用随机禁用的边缘。
    const disabled = [];
    for (const e in this._edges) {
      if (!this._edges[e].enabled) {
        disabled.push(e);
      }
    }

    if (disabled.length > 0) {
      this._edges[choice(disabled)].enabled = true;
    }
  }

  shift_weight(type: string) {
    //随机移动、扰动或设置边缘权重之一。

    const e = choice(Object.keys(this._edges));
    if (type === 'weight_perturb') {
      this._edges[e].weight += uniform(-1, 1);
    } else if (type === 'weight_set') {
      this._edges[e].weight = uniform(-1, 1);
    }
  }

  /**
   * 随机移动、扰动或设置传入边缘的偏差。
   * @param type 
   */
  shift_bias(type: string) {

    const n = choice([range(this._inputs, this._max_node - 1)]);
    if (type == 'bias_perturb') {
      this._nodes[n].bias += uniform(-1, 1);
    } else if (type == 'bias_set') {
      this._nodes[n].bias = uniform(-1, 1);
    }
  }

  random_pair() {
    // 生成随机节点 (i, j) 使得：
    //    1. i 不是输出
    //    2. j 不是输入
    //    3. i != j
    const c: number[] = [];
    for (let n = 0; n < this._max_node; n++) {
      if (!this.is_output(n)) {
        c.push(n);
      }
    }
    const i: number = choice(c);
    let j: number;
    const j_list: number[] = [];
    for (let n = 0; n < this._max_node; n++) {
      if (!this.is_input(n) && n != i) {
        j_list.push(n);
      }
    }
    if (j_list.length == 0) {
      j = this._max_node;
      this.add_node();
    } else {
      j = choice(j_list);
    }

    return [i, j];
  }

  is_input(n: number) {
    //确定节点 ID 是否为输入。
    if (0 <= n) {
      if (n < this._inputs) {
        return true;
      }
    }
    return false;
  }

  is_output(n: number) {
    //确定节点 ID 是否为输出。
    if (this._inputs <= n) {
      if (n < this._unhidden) {
        return true;
      }
    }
    return false;
  }

  is_hidden(n: number) {
    //确定节点 id 是否隐藏。
    if (this._unhidden <= n) {
      if (n < this._max_node) {
        return true;
      }
    }
    return false;
  }

  is_disabled() {
    //确定它的所有基因是否都被禁用。
    const data = [];
    for (const i in this._edges) {
      if (this._edges[i].enabled == false) {
        data.push(true);
      }
    }
    if (data.length == Object.keys(this._edges).length) {
      return true;
    }
    return false;
  }

  get_fitness() {
    //返回基因组的适应度。
    return this._fitness;
  }

  get_nodes() {
    //获取网络的节点。
    return copy(this._nodes);
  }

  get_edges() {
    //获取网络的边缘。
    return copy(this._edges);
  }

  get_num_nodes() {
    //获取网络中的节点数。
    return this._max_node;
  }

  set_fitness(score: number) {
    //设置这个基因组的适应度分数。
    this._fitness = score;
  }

  reset() {
    //重置基因组的内部状态。
    for (let n = 0; n < this._max_node; n++) {
      this._nodes[n].output = 0;
    }
    this._fitness = 0;
  }

  clone() {
    //克隆深拷贝。
    return deepcopy(this);
  }
}

/**
 * 物种
 */
export class Specie {
  _members: Genome[];
  _fitness_history: number[];
  _fitness_sum: number;
  _max_fitness_history: number;

  constructor(max_fitness_history: number, members: Genome) {
    //*members 元组
    this._members = [members];
    this._fitness_history = [];
    this._fitness_sum = 0;
    this._max_fitness_history = max_fitness_history;
  }

  breed(
    mutation_probabilities: { [key: string]: number },
    breed_probabilities: {
      [key: string]: number;
    },
  ): Genome {
    //作为变异克隆的结果返回一个孩子
    // 或两个亲本基因组之间的交叉。
    //变异一个克隆或繁殖两个随机基因组
    const population = Object.keys(breed_probabilities);
    const probabilities: number[] = [];
    for (const k of population) {
      probabilities.push(breed_probabilities[k]);
    }

    const cho = choices(population, probabilities)[0];
    let child: Genome = new Genome(0, 0, activation.SIGMOID);

    if (cho == 'asexual' || this._members.length == 1) {
      child = copy(choice(this._members));
      child.mutate(mutation_probabilities);
    } else if (cho == 'sexual') {
      const dam = sample(this._members, 2);
      child = genomic_crossover(dam[0], dam[1]);
    }
    return child;
  }

  update_fitness() {
    //更新每个基因组的调整适应值
    // 和历史适应度。
    let num = 0;
    for (const g of this._members) {
      g._adjusted_fitness = g._fitness / this._members.length;
      num += g._adjusted_fitness;
    }
    this._fitness_sum = num;
    this._fitness_history.push(this._fitness_sum);

    if (this._fitness_history.length > this._max_fitness_history) {
      this._fitness_history.splice(0, 1);
    }
  }

  cull_genomes(fittest_only: boolean) {
    //消灭每个物种最弱的基因组。
    this._members = this._members.sort((a, b) => b._fitness - a._fitness);
    let remaining;
    if (fittest_only) {
      //只保留获胜的基因组
      remaining = 1;
    } else {
      //保持前 25%
      remaining = Math.trunc(Math.ceil(0.25 * this._members.length));
    }

    this._members = this._members.slice(0, remaining);
  }

  get_best(): Genome {
    //获得体能得分最高的会员。
    const data = this._members.filter((x) => x._fitness);
    if (data.length == 0) {
      return this._members[0];
    }
    return data[0];
  }

  can_progress() {
    //确定物种是否应该在扑杀后幸存下来。
    const n = this._fitness_history.length;
    const avg = sum(this._fitness_history) / n;
    return avg > this._fitness_history[0] || n < this._max_fitness_history;
  }
}

/**
 * 拓扑神经网络
 */
export default class Neat {
  //通过进化学习的“大脑”的基础类
  //  的基因组群体。
  _inputs: number;
  _outputs: number;
  _species: Specie[];
  _genomes: Genome[];
  _population: number;
  _hyperparams: Hyperparameters;
  _generation: number;
  _current_species: number;
  _current_genome: number;
  _global_best: Genome;

  /**
   * 初始化
   * @param inputs 输入数量
   * @param outputs 输出数量
   * @param population 人口
   * @param hyperparams 超参数
   */
  constructor(
    inputs = 0,
    outputs = 0,
    population = 100,
    hyperparams = new Hyperparameters(),
  ) {
    this._inputs = inputs;
    this._outputs = outputs;

    this._species = [];
    this._genomes = [];
    this._population = population;

    //超参数
    this._hyperparams = hyperparams;

    this._generation = 0;
    this._current_species = 0;
    this._current_genome = 0;
    this._global_best = new Genome(this._inputs, this._outputs, hyperparams.default_activation)

    this.generate();
  }
  /**
   * 生成初始基因组群。
   */
  generate() {
    for (let i = 0; i < this._population; i++) {
      const g = new Genome(
        this._inputs,
        this._outputs,
        this._hyperparams.default_activation,
      );
      g.generate();
      this.classify_genome(g);
    }
    //设置初始最佳基因组
    this._global_best = this._species[0]._members[0];
    //更新所有的基因组
    this.update_genomes()
  }

  classify_genome(genome: Genome) {
    //通过基因组将基因组分类为物种
    // 距离算法。
    if (this._species.length == 0) {
      this._species.push(
        new Specie(this._hyperparams.max_fitness_history, genome),
      );
    } else {
      // /将基因组与每个物种中的代表性 s[0] 进行比较
      for (const s of this._species) {
        const rep = s._members[0];
        const dist = genomic_distance(
          genome,
          rep,
          this._hyperparams.distance_weights,
        );
        if (dist <= this._hyperparams.delta_threshold) {
          s._members.push(genome);
          return;
        }
      }

      //不适合任何其他物种，创建一个新物种
      this._species.push(
        new Specie(this._hyperparams.max_fitness_history, genome),
      );
    }
  }

  /**
   * 更新整个种群的最高适应度分数。
   */
  update_fittest() {
    const top_performers: Genome[] = [];
    for (const s of this._species) {
      top_performers.push(s.get_best());
    }
    const current_top =
      top_performers.filter((x) => x._fitness).length == 0
        ? top_performers[0]
        : top_performers.filter((x) => x._fitness)[0];
    if (current_top._fitness > this._global_best._fitness) {
      this._global_best = current_top.clone();
    }
  }

  /**
   * 更新所有基因组
   */
  update_genomes = () => {
    const gennomes: Genome[] = [];
    for (let i = 0, len = this._species.length; i < len; i++) {
      for (let g = 0, len2 = this._species[i]._members.length; g < len2; g++) {
        gennomes.push(this._species[i]._members[g])
      }
    }
    this._genomes = gennomes;
  }

  /**
   * 通过消除表现最差的人来进化人口
   * 基因组并重新填充突变的儿童，优先考虑
   * 最有前途的物种
   */
  evolve() {
    let global_fitness_sum = 0;
    for (const s of this._species) {
      s.update_fitness();
      global_fitness_sum += s._fitness_sum;
    }

    if (global_fitness_sum == 0) {
      //没有进展，大家变异
      for (const s of this._species) {
        for (const g of s._members) {
          g.mutate(this._hyperparams.mutation_probabilities);
        }
      }
    } else {
      //只保留有改进潜力的物种
      const surviving_species: Specie[] = [];
      for (const s of this._species) {
        if (s.can_progress()) {
          surviving_species.push(s);
        }
      }
      this._species = surviving_species;

      //消除每个物种表现最差的基因组
      for (const s of this._species) {
        s.cull_genomes(false);
      }

      //重新填充
      this._species.forEach((s) => {
        const ratio = s._fitness_sum / global_fitness_sum;
        const diff = this._population - this.get_population();
        const offspring = Math.round(ratio * diff);

        for (let j = 0; j < offspring; j++) {
          this.classify_genome(
            s.breed(
              this._hyperparams.mutation_probabilities,
              this._hyperparams.breed_probabilities,
            ),
          );
        }
      });

      // 没有物种幸存
      // 使用变异的最小结构和全局最佳重新填充
      if (this._species.length == 0) {
        for (let i = 0; i < this._population; i++) {
          let g: Genome;
          if (i % 3 == 0) {

            g = this._global_best.clone();
          } else {
            g = new Genome(
              this._inputs,
              this._outputs,
              this._hyperparams.default_activation,
            );
            g.generate();
          }
          g.mutate(this._hyperparams.mutation_probabilities);
          this.classify_genome(g);
        }
      }
    }
    this._generation += 1;
  }

  /**
   * 确定系统是否应该继续发展
   * @returns 
   */
  should_evolve() {
    // 基于最大适应度和代数。
    this.update_fittest();
    //更新所有个基因
    this.update_genomes();

    const fit = this._global_best._fitness <= this._hyperparams.max_fitness;
    const end = this._generation != this._hyperparams.max_generations;
    return fit && end;
  }

  /**
   * 在每次评估个体基因组后调用
   */
  next_iteration() {
    // 进步训练。
    const s = this._species[this._current_species];
    if (this._current_genome < s._members.length - 1) {
      //学习次数
      this._current_genome += 1;
    } else {
      //种族进化到下一代
      if (this._current_species < this._species.length - 1) {
        this._current_species += 1;
        this._current_genome = 0;
      } else {
        //基因进化到下一代
        this.evolve();
        this._current_species = 0;
        this._current_genome = 0;
      }
    }
  }

  evaluate_parallel(
    // evaluator,
    args: [string, number],
    kwargs: { [key: string]: number },
  ) {
    //并行评估 ***********暂时用不到
    //*args元组 **kwargs字典
    //在单独的过程中评估整个群体
    // 进行训练。 评估器功能必须采用基因组
    // 作为它的第一个参数并返回一个数字适应度分数。
    // 任何传递给评估器的全局状态都会被复制，并且不会
    // 在父进程中进行修改。
    // const max_proc = max(mp.cpu_count() - 1, 1)
    // const pool = mp.Pool(processes = max_proc)
  }

  get_fittest() {
    //返回具有最高全局适应度分数的基因组。
    return this._global_best;
  }

  get_population() {
    //返回真实的（计算出的）人口规模。
    const lenarr = [];
    for (const s of this._species) {
      lenarr.push(s._members.length);
    }
    return sum(lenarr);
  }

  /**
   * 获取当前基因组进行评估。
   * @returns 
   */
  get_current() {
    const s: Specie = this._species[this._current_species];
    return s._members[this._current_genome];
  }

  /**
   * 获取正在评估的当前物种的索引。
   * @returns 
   */
  get_current_species = (): number => {
    return this._current_species;
  }

  /**
   * 获取当前正在评估的基因组的索引。
   * @returns 
   */
  get_current_genome = (): number => {
    return this._current_genome;
  }

  /**
   * 获取该种群的当前代号。
   * @returns 
   */
  get_generation = (): number => {
    return this._generation;
  }

  /**
   * 获取物种列表及其各自的成员基因组。
   * @returns 
   */
  get_species = (): Specie[] => {
    return this._species;
  }

  /**
   * 获取所有的基因
   */
  get_genomes = (): Genome[] => {
    return this._genomes;
  }

  /**
   * 将训练模型导出
   * @param filename 文件名
   * @param suffix 后缀
   */
  export(filename: string = 'neat', suffix: string = 'pkl') {
    this.downloadfun(JSON.stringify(this), `${filename}.${suffix}`)
  }

  downloadfun = (t: string, e: string) => {
    const s = document.createElement("a");
    s.download = e,
      s.style.display = "none";
    const n = new Blob([t]);
    s.href = URL.createObjectURL(n),
      document.body.appendChild(s),
      s.click(),
      document.body.removeChild(s)
  }

  /**
   * 导入一个训练模型
   * @param filename 文件名
   * @param suffix 后缀名
   * @returns 
   */
  static import(filename: string, suffix: string = 'pkl'): Neat {
    //从磁盘返回一个种群实例。
    // const buffer = fs.readFileSync(`${filename}.${suffix}`, {
    //   flag: 'r',
    // });
    const neat = new Neat();
    // const dneat = JSON.parse(buffer.toString());

    // for (const i in dneat) {
    //   neat[i] = dneat[i];
    // }
    // return neat;

    // if (JSON.stringify(t[0]) !== JSON.stringify(this.exportModel)) throw "Model Error";
    // console.log("Importing " + t[1].length + " creature(s)");
    // for (let e = 0, s = t[1].length; e < s; e++) {
    //   let s = new Genome(this.model);
    //   s.setFlattenedGenes(t[1][e]),
    //     this.genomes.push(s),
    //     this.populationSize++
    // }

    return neat;
  }
}
