import assert from 'node:assert/strict'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import {
  ADDITIONAL_STRUCTURE_CONTENT,
  ADDITIONAL_UNIT_CONTENT,
  BASE_STRUCTURE_CONTENT,
  CONTENT_EXCLUDED_AS_NON_ENTITIES,
} from '../src/examples/Rts/contentRegistry.ts'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const assetsRoot = resolve(projectRoot, 'src/assets/units')
const assetPath = (relativePath: string) => resolve(assetsRoot, relativePath)

const allIniPaths = () => {
  const paths: string[] = []
  const walk = (directory: string) => {
    for (const name of readdirSync(directory)) {
      const absolutePath = resolve(directory, name)
      if (statSync(absolutePath).isDirectory()) walk(absolutePath)
      else if (name.toLowerCase().endsWith('.ini')) paths.push(absolutePath.slice(assetsRoot.length + 1))
    }
  }
  walk(assetsRoot)
  return paths
}

const BASELINE_INI_PATHS = [
  'combat_engineer/combat_engineer.ini',
  'scout/scout.ini',
  'test_tank/tank.ini',
  'plasma_tank/plasma_tank.ini',
  'mammoth_tank/mammoth_tank.ini',
  'helicopter/helicopter.ini',
  'missile_tank/missile_tank.ini',
  'laser_tank/laser_tank.ini',
  'tanks/artillery.ini',
  'tanks/heavy_artillery.ini',
  'experimental_tank/experimental_tank.ini',
  'interceptor/interceptor.ini',
  'heavy_interceptor/heavyInterceptor.ini',
  'bomber/bomber.ini',
  'light_gunship/light_gunship.ini',
  'spy_drone/spy_drone.ini',
  'fire_bee/fire_bee.ini',
  'light_sub/light_sub.ini',
  'heavy_battleship/heavy_battleship.ini',
  'heavy_missile_ship/heavy_missile_ship.ini',
  'heavy_aa_ship/heavy_aa_ship.ini',
  'extractor/extractor.ini',
  'fabricator/fabricatorT1.ini',
  'mech_factory/mechFactory.ini',
  'outpost/outpost.ini',
  'turrets/turret_common_land.ini',
  'turrets/turret_t1.ini',
  'laboratory/laboratory.ini',
]

test('注册表中的额外单位、建筑和总部素材/INI全部存在', () => {
  const roles = ADDITIONAL_UNIT_CONTENT.map((entry) => entry.role)
  assert.equal(new Set(roles).size, roles.length, '单位角色重复')
  for (const entry of ADDITIONAL_UNIT_CONTENT) {
    assert.ok(existsSync(assetPath(entry.ini)), `${entry.role}: 缺少 ${entry.ini}`)
    assert.ok(existsSync(assetPath(entry.image)), `${entry.role}: 缺少 ${entry.image}`)
    if ('deadImage' in entry) assert.ok(existsSync(assetPath(entry.deadImage)), `${entry.role}: 缺少 ${entry.deadImage}`)
  }

  const kinds = ADDITIONAL_STRUCTURE_CONTENT.map((entry) => entry.kind)
  assert.equal(new Set(kinds).size, kinds.length, '建筑种类重复')
  for (const entry of ADDITIONAL_STRUCTURE_CONTENT) {
    for (const ini of entry.ini) assert.ok(existsSync(assetPath(ini)), `${entry.kind}: 缺少 ${ini}`)
    assert.ok(existsSync(assetPath(entry.body)), `${entry.kind}: 缺少 ${entry.body}`)
    if ('back' in entry) assert.ok(existsSync(assetPath(entry.back)), `${entry.kind}: 缺少 ${entry.back}`)
    if ('turret' in entry) assert.ok(existsSync(assetPath(entry.turret)), `${entry.kind}: 缺少 ${entry.turret}`)
    if ('door' in entry) assert.ok(existsSync(assetPath(entry.door)), `${entry.kind}: 缺少 ${entry.door}`)
  }

  for (const entry of BASE_STRUCTURE_CONTENT) {
    assert.ok(existsSync(assetPath(entry.ini)), `${entry.kind}: 缺少 ${entry.ini}`)
    assert.ok(existsSync(assetPath(entry.body)), `${entry.kind}: 缺少 ${entry.body}`)
    assert.ok(existsSync(assetPath(entry.deadImage)), `${entry.kind}: 缺少 ${entry.deadImage}`)
  }
})

test('所有已知资源配置均有明确分类：基线、注册实体或非实体部件', () => {
  const classified = new Set([
    ...BASELINE_INI_PATHS,
    ...ADDITIONAL_UNIT_CONTENT.map((entry) => entry.ini),
    ...ADDITIONAL_STRUCTURE_CONTENT.flatMap((entry) => entry.ini),
    ...CONTENT_EXCLUDED_AS_NON_ENTITIES,
  ])
  for (const path of [...BASELINE_INI_PATHS, ...CONTENT_EXCLUDED_AS_NON_ENTITIES]) {
    assert.ok(existsSync(assetPath(path)), `分类引用了不存在的INI: ${path}`)
  }
  const unclassified = allIniPaths().filter((path) => !classified.has(path))
  assert.deepEqual(unclassified, [], `存在未分类INI: ${unclassified.join(', ')}`)
})
