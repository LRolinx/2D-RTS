import assert from 'node:assert/strict'
import test from 'node:test'
import { evaluateStrategicAi, type StrategicAiSnapshot } from '../src/examples/Rts/strategicAi.ts'

const snapshot = (overrides: Partial<StrategicAiSnapshot> = {}): StrategicAiSnapshot => ({
  resources: 220,
  income: 8,
  unitCount: 8,
  unitCap: 20,
  enemyUnitCount: 8,
  enemyUnitCap: 20,
  baseHealth: 1,
  enemyBaseHealth: 1,
  controlledNodes: 1,
  totalNodes: 5,
  extractors: 1,
  factories: 1,
  airfields: 0,
  turrets: 1,
  repairStations: 0,
  radars: 0,
  enemyNearBase: 0,
  frontlinePressure: 0,
  elapsedFrames: 1200,
  ...overrides,
})

test('AI expands when the economy is behind', () => {
  const plan = evaluateStrategicAi(snapshot({ controlledNodes: 0, extractors: 0, factories: 0 }))
  assert.equal(plan.phase, 'expand')
  assert.ok(plan.desiredExtractors >= 2)
  assert.ok(plan.economy > plan.attack)
})

test('AI defends when the base is threatened', () => {
  const plan = evaluateStrategicAi(snapshot({ baseHealth: 0.36, enemyNearBase: 4, frontlinePressure: 0.9 }))
  assert.equal(plan.phase, 'recover')
  assert.equal(plan.targetPriority, 'defense')
  assert.ok(plan.retreatHealth >= 0.4)
})

test('AI launches an assault with a superior army', () => {
  const plan = evaluateStrategicAi(snapshot({
    resources: 360,
    unitCount: 16,
    enemyUnitCount: 8,
    factories: 2,
    controlledNodes: 4,
    extractors: 3,
    enemyBaseHealth: 0.8,
    elapsedFrames: 2600,
  }))
  assert.equal(plan.phase, 'assault')
  assert.ok(plan.attack > plan.defense)
  assert.ok(plan.attackWave >= 6)
})

test('neural bias nudges priorities without overriding safety rules', () => {
  const plan = evaluateStrategicAi(
    snapshot({ baseHealth: 0.3, enemyNearBase: 3 }),
    { attack: 0.95, air: 0.95 },
  )
  assert.equal(plan.phase, 'recover')
  assert.ok(plan.defense > plan.attack)
})
