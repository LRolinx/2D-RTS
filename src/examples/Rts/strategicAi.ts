export type StrategicAiPhase = 'opening' | 'expand' | 'tech' | 'defend' | 'assault' | 'recover'

export type StrategicAiSnapshot = {
  resources: number
  income: number
  unitCount: number
  unitCap: number
  enemyUnitCount: number
  enemyUnitCap: number
  baseHealth: number
  enemyBaseHealth: number
  controlledNodes: number
  totalNodes: number
  extractors: number
  factories: number
  airfields: number
  turrets: number
  repairStations: number
  radars: number
  enemyNearBase: number
  frontlinePressure: number
  elapsedFrames: number
}

export type StrategicAiBias = Partial<Pick<StrategicAiPlan, 'economy' | 'production' | 'defense' | 'attack' | 'air' | 'tech'>>

export type StrategicAiPlan = {
  phase: StrategicAiPhase
  economy: number
  production: number
  defense: number
  attack: number
  air: number
  tech: number
  desiredBuilders: number
  desiredExtractors: number
  desiredFactories: number
  desiredAirfields: number
  attackWave: number
  retreatHealth: number
  targetPriority: 'base' | 'factory' | 'extractor' | 'airfield' | 'defense'
  rationale: string
}

const clamp = (value: number, min = 0.05, max = 0.95) => Math.max(min, Math.min(max, value))

const blend = (heuristic: number, neural?: number) => (
  clamp(heuristic * 0.84 + (neural === undefined ? heuristic : clamp(neural)) * 0.16)
)

export const createInitialStrategicAiPlan = (): StrategicAiPlan => ({
  phase: 'opening',
  economy: 0.72,
  production: 0.58,
  defense: 0.42,
  attack: 0.32,
  air: 0.24,
  tech: 0.3,
  desiredBuilders: 3,
  desiredExtractors: 2,
  desiredFactories: 1,
  desiredAirfields: 0,
  attackWave: 5,
  retreatHealth: 0.28,
  targetPriority: 'extractor',
  rationale: '开局扩张',
})

export const evaluateStrategicAi = (
  snapshot: StrategicAiSnapshot,
  neuralBias: StrategicAiBias = {},
): StrategicAiPlan => {
  const nodeRatio = snapshot.controlledNodes / Math.max(1, snapshot.totalNodes)
  const armyRatio = snapshot.unitCount / Math.max(1, snapshot.enemyUnitCount)
  const capacityRatio = snapshot.unitCount / Math.max(1, snapshot.unitCap)
  const danger = Math.max(
    (1 - snapshot.baseHealth) * 1.4,
    snapshot.enemyNearBase / 5,
    snapshot.frontlinePressure,
  )
  const hasEconomy = snapshot.extractors >= Math.min(2, snapshot.totalNodes)
  const canAssault = snapshot.unitCount >= 5 && (armyRatio >= 1.12 || snapshot.enemyBaseHealth < 0.58)

  let phase: StrategicAiPhase = 'opening'
  let rationale = '建立初始经济'
  if (snapshot.baseHealth < 0.42) {
    phase = 'recover'
    rationale = '基地濒危，撤退并维修'
  } else if (danger > 0.62) {
    phase = 'defend'
    rationale = '前线受压，优先防守'
  } else if (canAssault && snapshot.factories > 0) {
    phase = 'assault'
    rationale = '兵力成形，组织进攻波次'
  } else if (!hasEconomy || nodeRatio < 0.34) {
    phase = 'expand'
    rationale = '抢占资源并建立经济'
  } else if (snapshot.factories < 1 || snapshot.radars < 1 || (snapshot.resources > 260 && snapshot.airfields < 1)) {
    phase = 'tech'
    rationale = '补齐生产与侦察设施'
  } else if (snapshot.elapsedFrames > 1800) {
    phase = 'assault'
    rationale = '中期推进并压制敌方'
  }

  const economy = blend(
    phase === 'expand' ? 0.9 : nodeRatio < 0.5 ? 0.72 : 0.46,
    neuralBias.economy,
  )
  const production = blend(
    phase === 'tech' || phase === 'assault' ? 0.84 : capacityRatio > 0.88 ? 0.42 : 0.68,
    neuralBias.production,
  )
  const defense = blend(
    phase === 'defend' || phase === 'recover' ? 0.92 : danger > 0.3 ? 0.68 : 0.4,
    neuralBias.defense,
  )
  const attack = blend(
    phase === 'assault' ? 0.9 : phase === 'defend' || phase === 'recover' ? 0.28 : 0.52,
    neuralBias.attack,
  )
  const air = blend(
    snapshot.resources > 260 && snapshot.factories > 0 ? 0.72 : snapshot.resources > 150 ? 0.48 : 0.22,
    neuralBias.air,
  )
  const tech = blend(
    phase === 'tech' || snapshot.radars === 0 ? 0.78 : snapshot.factories > 1 ? 0.64 : 0.4,
    neuralBias.tech,
  )

  const desiredBuilders = phase === 'expand' ? 4 : phase === 'recover' ? 3 : 2
  const desiredExtractors = Math.min(snapshot.totalNodes, phase === 'expand' ? 4 : 3)
  const desiredFactories = phase === 'assault' || snapshot.resources > 300 ? 2 : 1
  const desiredAirfields = air > 0.58 && snapshot.factories > 0 ? 1 : 0
  const attackWave = phase === 'assault' ? (armyRatio > 1.45 ? 8 : 6) : 5
  const retreatHealth = phase === 'defend' || phase === 'recover' ? 0.42 : 0.28
  const targetPriority = phase === 'assault'
    ? snapshot.enemyBaseHealth < 0.7 ? 'base' : snapshot.airfields === 0 ? 'factory' : 'extractor'
    : phase === 'defend' || phase === 'recover'
      ? 'defense'
      : phase === 'tech'
        ? 'factory'
        : 'extractor'

  return {
    phase,
    economy,
    production,
    defense,
    attack,
    air,
    tech,
    desiredBuilders,
    desiredExtractors,
    desiredFactories,
    desiredAirfields,
    attackWave,
    retreatHealth,
    targetPriority,
    rationale,
  }
}
