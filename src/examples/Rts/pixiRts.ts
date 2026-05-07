import {
  Application,
  Container,
  Graphics,
  Rectangle,
  Sprite,
  Text,
  TextStyle,
  Texture,
} from 'pixi.js'
import Neat, { activation, Hyperparameters } from '../../NeatNetwork'
import tankImageUrl from '../../assets/units/test_tank/tank.png'
import scoutImageUrl from '../../assets/units/scout/base.png'
import plasmaTankImageUrl from '../../assets/units/plasma_tank/plasma_tank.png'
import mammothTankImageUrl from '../../assets/units/mammoth_tank/mammoth_tank.png'
import helicopterImageUrl from '../../assets/units/helicopter/helicopter.png'
import helicopterBladesImageUrl from '../../assets/units/helicopter/helicopter_blades.png'
import missileTankImageUrl from '../../assets/units/missile_tank/missile_tank.png'
import laserTankImageUrl from '../../assets/units/laser_tank/laser_tank.png'
import artilleryImageUrl from '../../assets/units/tanks/artillery.png'
import heavyArtilleryImageUrl from '../../assets/units/tanks/heavy_artillery.png'
import experimentalTankImageUrl from '../../assets/units/experimental_tank/experimental_tank.png'
import interceptorImageUrl from '../../assets/units/interceptor/interceptor.png'
import heavyInterceptorImageUrl from '../../assets/units/heavy_interceptor/base2.png'
import bomberImageUrl from '../../assets/units/bomber/base.png'
import lightGunshipImageUrl from '../../assets/units/light_gunship/base.png'
import spyDroneImageUrl from '../../assets/units/spy_drone/base.png'
import fireBeeImageUrl from '../../assets/units/fire_bee/body.png'
import engineerImageUrl from '../../assets/units/combat_engineer/base.png'
import tankTurretImageUrl from '../../assets/units/test_tank/tank_turret.png'
import plasmaTurretImageUrl from '../../assets/units/plasma_tank/turret.png'
import mammothTurretImageUrl from '../../assets/units/mammoth_tank/mammoth_tank_turret.png'
import missileTurretImageUrl from '../../assets/units/missile_tank/missile_tank_turret.png'
import laserTurretImageUrl from '../../assets/units/laser_tank/laser_tank_turret.png'
import heavyArtilleryTurretImageUrl from '../../assets/units/tanks/heavy_artillery_turret.png'
import experimentalTurretImageUrl from '../../assets/units/experimental_tank/experimental_tank_turret.png'
import dirtTileUrl from '../../assets/tilesets/bitmaps/dirt.png'
import longGrassTileUrl from '../../assets/tilesets/bitmaps/longgrass.png'
import shortGrassTileUrl from '../../assets/tilesets/bitmaps/shortgrass.png'
import sandTileUrl from '../../assets/tilesets/bitmaps/sand.png'
import stoneTileUrl from '../../assets/tilesets/bitmaps/stone.png'
import mountainTileUrl from '../../assets/tilesets/bitmaps/mountain.png'
import waterTileUrl from '../../assets/tilesets/bitmaps/water.png'
import deepWaterTileUrl from '../../assets/tilesets/bitmaps/deepwater.png'
import shallowWaterTileUrl from '../../assets/tilesets/bitmaps/shallowwater.png'
import hqBaseImageUrl from '../../assets/units/laboratory/base.png'
import extractorBodyImageUrl from '../../assets/units/extractor/extractor.png'
import extractorBackImageUrl from '../../assets/units/extractor/extractor_back.png'
import fabricatorImageUrl from '../../assets/units/fabricator/fabricatorT1.png'
import mechFactoryTopImageUrl from '../../assets/units/mech_factory/mechFactoryTop.png'
import mechFactoryBottomImageUrl from '../../assets/units/mech_factory/mechFactoryBottom.png'
import mechFactoryDoorImageUrl from '../../assets/units/mech_factory/mechFactoryDoor.png'
import outpostImageUrl from '../../assets/units/outpost/outpost.png'
import turretBaseImageUrl from '../../assets/units/turrets/turret_base.png'
import turretTopImageUrl from '../../assets/units/turrets/turret_top.png'
import radarImageUrl from '../../assets/units/turrets/radar.png'
import missileProjectileImageUrl from '../../assets/units/experimental_carrier/projectile.png'
import engineerIniRaw from '../../assets/units/combat_engineer/combat_engineer.ini?raw'
import scoutIniRaw from '../../assets/units/scout/scout.ini?raw'
import tankIniRaw from '../../assets/units/tanks/tank.ini?raw'
import plasmaIniRaw from '../../assets/units/plasma_tank/plasma_tank.ini?raw'
import mammothIniRaw from '../../assets/units/mammoth_tank/mammoth_tank.ini?raw'
import helicopterIniRaw from '../../assets/units/helicopter/helicopter.ini?raw'
import missileIniRaw from '../../assets/units/missile_tank/missile_tank.ini?raw'
import laserIniRaw from '../../assets/units/laser_tank/laser_tank.ini?raw'
import artilleryIniRaw from '../../assets/units/tanks/artillery.ini?raw'
import heavyArtilleryIniRaw from '../../assets/units/tanks/heavy_artillery.ini?raw'
import experimentalIniRaw from '../../assets/units/experimental_tank/experimental_tank.ini?raw'
import interceptorIniRaw from '../../assets/units/interceptor/interceptor.ini?raw'
import heavyInterceptorIniRaw from '../../assets/units/heavy_interceptor/heavyInterceptor.ini?raw'
import bomberIniRaw from '../../assets/units/bomber/bomber.ini?raw'
import gunshipIniRaw from '../../assets/units/light_gunship/light_gunship.ini?raw'
import spyDroneIniRaw from '../../assets/units/spy_drone/spy_drone.ini?raw'
import fireBeeIniRaw from '../../assets/units/fire_bee/fire_bee.ini?raw'
import extractorCommonIniRaw from '../../assets/units/extractor/extractor_common.ini?raw'
import extractorIniRaw from '../../assets/units/extractor/extractor.ini?raw'
import fabricatorIniRaw from '../../assets/units/fabricator/fabricatorT1.ini?raw'
import mechFactoryIniRaw from '../../assets/units/mech_factory/mechFactory.ini?raw'
import outpostIniRaw from '../../assets/units/outpost/outpost.ini?raw'
import turretCommonIniRaw from '../../assets/units/turrets/turret_common_land.ini?raw'
import turretIniRaw from '../../assets/units/turrets/turret_t1.ini?raw'

type GridPoint = {
  x: number
  y: number
}

type Team = 'player' | 'enemy'
type IniData = Record<string, Record<string, string>>
type TurretIni = { section: string; id: string } & Record<string, string>

type BaseState = {
  team: Team
  x: number
  y: number
  hp: number
  maxHp: number
  sprite?: Sprite
  production?: ProductionJob
}

type StructureKind = 'turret' | 'extractor' | 'radar' | 'repair' | 'factory' | 'airfield'

type ProductionJob = {
  role: UnitRole
  progress: number
  duration: number
}

type ConstructionJob = {
  builderId: number
  progress: number
  duration: number
}

type StructureState = {
  id: number
  team: Team
  kind: StructureKind
  x: number
  y: number
  hp: number
  maxHp: number
  range: number
  damage: number
  cooldown: number
  attackCooldown: number
  canAttackFlying?: boolean
  canAttackLand?: boolean
  view: Graphics
  sprites: Sprite[]
  turretSprite?: Sprite
  doorSprite?: Sprite
  hpBar: Graphics
  flash: Graphics
  production?: ProductionJob
  construction?: ConstructionJob
  dead: boolean
}

type ResourceNode = {
  id: number
  x: number
  y: number
  amount: number
  controller?: Team
}

type CombatTarget = RtsUnit | BaseState | StructureState
type TerrainType = 'shortGrass' | 'longGrass' | 'dirt' | 'sand' | 'stone' | 'mountain' | 'water' | 'deepWater' | 'shallowWater'
type AttackKind = 'bullet' | 'cannon' | 'laser' | 'lightning' | 'beam' | 'missile' | 'artillery' | 'bomb' | 'rapid' | 'scan'
type MovementLayer = 'ground' | 'water' | 'air'

type AiIntent = {
  economy: number
  production: number
  defense: number
  attack: number
  air: number
  tech: number
  lastAction: string
}

type UnitRole =
  | 'engineer'
  | 'scout'
  | 'tank'
  | 'plasma'
  | 'mammoth'
  | 'helicopter'
  | 'missile'
  | 'laser'
  | 'artillery'
  | 'heavyArtillery'
  | 'experimental'
  | 'interceptor'
  | 'heavyInterceptor'
  | 'bomber'
  | 'gunship'
  | 'spyDrone'
  | 'fireBee'

type UnitTurretPartDef = {
  texture: Texture
  x: number
  y: number
  width?: number
  height?: number
  anchorY?: number
}

type WeaponDef = {
  id: string
  kind: AttackKind
  damage: number
  cooldown: number
  warmup: number
  projectileSpeed: number
  projectileLife: number
  splashRadius: number
  projectileSize: number
  projectileFrame?: number
  projectileTexture?: Texture
  hitTexture?: Texture
  canAttackFlying?: boolean
  canAttackLand?: boolean
}

type UnitDef = {
  role: UnitRole
  name: string
  texture: Texture
  frames?: Texture[]
  frameWidth: number
  frameHeight: number
  frameCount: number
  animationSpeed: number
  cost: number
  hp: number
  speed: number
  acceleration?: number
  brake?: number
  turnRate?: number
  range: number
  damage: number
  cooldown: number
  projectileSpeed: number
  attackKind?: AttackKind
  splashRadius?: number
  projectileSize?: number
  width: number
  height: number
  color: number
  flying?: boolean
  rotorTexture?: Texture
  rotorWidth?: number
  rotorHeight?: number
  rotorOffsetY?: number
  rotorSpin?: number
  turretTexture?: Texture
  turretWidth?: number
  turretHeight?: number
  turretOffsetX?: number
  turretOffsetY?: number
  turretAnchorY?: number
  turretTurnRate?: number
  turretParts?: UnitTurretPartDef[]
  fixedFiring?: boolean
  builder?: boolean
  iniName?: string
  techLevel?: number
  buildSpeed?: number
  movementType?: string
  attackMovement?: string
  canAttackFlying?: boolean
  canAttackLand?: boolean
  isBuildingConfig?: boolean
  weapons?: WeaponDef[]
}

type RtsUnit = {
  id: number
  team: Team
  def: UnitDef
  x: number
  y: number
  hp: number
  maxHp: number
  speed: number
  currentSpeed: number
  path: GridPoint[]
  pathIndex: number
  container: Container
  sprite: Sprite
  desiredRotation: number
  frameTextures: Texture[]
  animationClock: number
  rotor?: Sprite
  turret?: Sprite
  turretParts: Sprite[]
  turretRotation: number
  hpBar: Graphics
  flash: Graphics
  aiCooldown: number
  attackCooldown: number
  target?: CombatTarget
  pendingWeapon?: { weapon: WeaponDef; target: CombatTarget; remaining: number }
  commandUntil: number
  dead: boolean
}

type Projectile = {
  x: number
  y: number
  target: CombatTarget
  sourceTeam: Team
  damage: number
  speed: number
  life: number
  color: number
  radius: number
  splashRadius: number
  kind: AttackKind
  trailCooldown: number
  view: Container
}

type Explosion = {
  x: number
  y: number
  life: number
  maxLife: number
  radius: number
  color: number
  view: Graphics
}

type BeamEffect = {
  life: number
  maxLife: number
  color: number
  width: number
  view: Graphics
}

type CameraState = {
  x: number
  y: number
  scale: number
}

type DragState = {
  button: number
  moved: boolean
  screenStartX: number
  screenStartY: number
  worldStart: GridPoint
  worldCurrent: GridPoint
}

const GRID_SIZE = 18
const SIDEBAR_WIDTH = 320
const PLAYER_UNIT_COUNT = 4
const ENEMY_UNIT_COUNT = 5
const STRESS_UNIT_COUNT = 500
const PRODUCTION_BINDINGS: Array<{ code: string; key: string; role: UnitRole }> = [
  { code: 'KeyM', key: 'M', role: 'engineer' },
  { code: 'KeyQ', key: 'Q', role: 'scout' },
  { code: 'KeyW', key: 'W', role: 'tank' },
  { code: 'KeyE', key: 'E', role: 'plasma' },
  { code: 'KeyA', key: 'A', role: 'mammoth' },
  { code: 'KeyS', key: 'S', role: 'helicopter' },
  { code: 'KeyD', key: 'D', role: 'missile' },
  { code: 'KeyF', key: 'F', role: 'laser' },
  { code: 'KeyG', key: 'G', role: 'artillery' },
  { code: 'KeyH', key: 'H', role: 'heavyArtillery' },
  { code: 'KeyJ', key: 'J', role: 'experimental' },
  { code: 'KeyZ', key: 'Z', role: 'interceptor' },
  { code: 'KeyX', key: 'X', role: 'heavyInterceptor' },
  { code: 'KeyC', key: 'C', role: 'bomber' },
  { code: 'KeyV', key: 'V', role: 'gunship' },
  { code: 'KeyB', key: 'B', role: 'spyDrone' },
  { code: 'KeyN', key: 'N', role: 'fireBee' },
]
const PRODUCTION_LABELS: Record<UnitRole, string> = {
  engineer: '工程',
  scout: '侦察',
  tank: '坦克',
  plasma: '等离子',
  mammoth: '猛犸',
  helicopter: '直升机',
  missile: '导弹',
  laser: '激光',
  artillery: '火炮',
  heavyArtillery: '重炮',
  experimental: '实验',
  interceptor: '拦截',
  heavyInterceptor: '重拦',
  bomber: '轰炸',
  gunship: '炮艇',
  spyDrone: '无人机',
  fireBee: '火蜂',
}
const UNIT_ASSET_URLS = import.meta.glob([
  '../../assets/units/shared/*.{png,jpg,jpeg,webp}',
  '../../assets/units/turrets/*.{png,jpg,jpeg,webp}',
  '../../assets/units/combat_engineer/*.{png,jpg,jpeg,webp}',
  '../../assets/units/scout/*.{png,jpg,jpeg,webp}',
  '../../assets/units/tanks/*.{png,jpg,jpeg,webp}',
  '../../assets/units/plasma_tank/*.{png,jpg,jpeg,webp}',
  '../../assets/units/mammoth_tank/*.{png,jpg,jpeg,webp}',
  '../../assets/units/helicopter/*.{png,jpg,jpeg,webp}',
  '../../assets/units/missile_tank/*.{png,jpg,jpeg,webp}',
  '../../assets/units/laser_tank/*.{png,jpg,jpeg,webp}',
  '../../assets/units/experimental_tank/*.{png,jpg,jpeg,webp}',
  '../../assets/units/interceptor/*.{png,jpg,jpeg,webp}',
  '../../assets/units/heavy_interceptor/*.{png,jpg,jpeg,webp}',
  '../../assets/units/bomber/*.{png,jpg,jpeg,webp}',
  '../../assets/units/light_gunship/*.{png,jpg,jpeg,webp}',
  '../../assets/units/spy_drone/*.{png,jpg,jpeg,webp}',
  '../../assets/units/fire_bee/*.{png,jpg,jpeg,webp}',
], {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>
const UNIT_ASSET_DIRS: Record<UnitRole, string> = {
  engineer: 'combat_engineer',
  scout: 'scout',
  tank: 'tanks',
  plasma: 'plasma_tank',
  mammoth: 'mammoth_tank',
  helicopter: 'helicopter',
  missile: 'missile_tank',
  laser: 'laser_tank',
  artillery: 'tanks',
  heavyArtillery: 'tanks',
  experimental: 'experimental_tank',
  interceptor: 'interceptor',
  heavyInterceptor: 'heavy_interceptor',
  bomber: 'bomber',
  gunship: 'light_gunship',
  spyDrone: 'spy_drone',
  fireBee: 'fire_bee',
}
const createTileTexture = (url: string, x = 0, y = 0) => new Texture(
  Texture.from(url).baseTexture,
  new Rectangle(x, y, 20, 20),
)
const UNIT_INI_RAW: Record<UnitRole, string> = {
  engineer: engineerIniRaw,
  scout: scoutIniRaw,
  tank: tankIniRaw,
  plasma: plasmaIniRaw,
  mammoth: mammothIniRaw,
  helicopter: helicopterIniRaw,
  missile: missileIniRaw,
  laser: laserIniRaw,
  artillery: artilleryIniRaw,
  heavyArtillery: heavyArtilleryIniRaw,
  experimental: experimentalIniRaw,
  interceptor: interceptorIniRaw,
  heavyInterceptor: heavyInterceptorIniRaw,
  bomber: bomberIniRaw,
  gunship: gunshipIniRaw,
  spyDrone: spyDroneIniRaw,
  fireBee: fireBeeIniRaw,
}
const STRUCTURE_INI_RAW: Record<StructureKind, string[]> = {
  turret: [turretCommonIniRaw, turretIniRaw],
  extractor: [extractorCommonIniRaw, extractorIniRaw],
  radar: [outpostIniRaw],
  repair: [fabricatorIniRaw],
  factory: [mechFactoryIniRaw],
  airfield: [outpostIniRaw],
}
const createSheetFrameTexture = (url: string, frameWidth: number, frameHeight: number, frame = 0) => new Texture(
  Texture.from(url).baseTexture,
  new Rectangle(frame * frameWidth, 0, frameWidth, frameHeight),
)
const STRUCTURE_TEXTURES: Record<StructureKind, {
  body: Texture
  back?: Texture
  turret?: Texture
  door?: Texture
  width: number
  height: number
  backWidth?: number
  backHeight?: number
  turretWidth?: number
  turretHeight?: number
  turretOffsetX?: number
  turretOffsetY?: number
}> = {
  turret: {
    body: Texture.from(turretBaseImageUrl),
    turret: Texture.from(turretTopImageUrl),
    width: 35,
    height: 32,
    turretWidth: 12,
    turretHeight: 46,
    turretOffsetY: -6,
  },
  extractor: {
    body: createSheetFrameTexture(extractorBodyImageUrl, 37, 59),
    back: Texture.from(extractorBackImageUrl),
    width: 38,
    height: 60,
    backWidth: 51,
    backHeight: 44,
  },
  radar: {
    body: Texture.from(outpostImageUrl),
    turret: Texture.from(radarImageUrl),
    width: 42,
    height: 49,
    turretWidth: 34,
    turretHeight: 34,
    turretOffsetX: 0,
    turretOffsetY: -21,
  },
  repair: {
    body: createSheetFrameTexture(fabricatorImageUrl, 47, 60),
    width: 47,
    height: 60,
  },
  factory: {
    body: Texture.from(mechFactoryTopImageUrl),
    back: Texture.from(mechFactoryBottomImageUrl),
    door: Texture.from(mechFactoryDoorImageUrl),
    width: 58,
    height: 83,
  },
  airfield: {
    body: Texture.from(outpostImageUrl),
    turret: Texture.from(radarImageUrl),
    width: 58,
    height: 48,
    turretWidth: 26,
    turretHeight: 26,
    turretOffsetY: -18,
  },
}
const HQ_TEXTURE = Texture.from(hqBaseImageUrl)

export class PixiRts {
  private app: Application
  private host: HTMLElement
  private resizeObserver: ResizeObserver
  private worldLayer = new Container()
  private terrainLayer = new Container()
  private mapLayer = new Graphics()
  private structureLayer = new Container()
  private wreckLayer = new Container()
  private pathLayer = new Graphics()
  private unitLayer = new Container()
  private effectLayer = new Container()
  private overlayLayer = new Graphics()
  private minimapLayer = new Graphics()
  private uiLayer = new Container()
  private uiBackground = new Graphics()
  private uiTitle: Text
  private uiStats: Text
  private uiCommands: Text
  private map: number[][] = []
  private terrainMap: TerrainType[][] = []
  private heightMap: number[][] = []
  private units: RtsUnit[] = []
  private structures: StructureState[] = []
  private resourceNodes: ResourceNode[] = []
  private selectedUnits: RtsUnit[] = []
  private selectedCell?: GridPoint
  private activeBuilder?: RtsUnit
  private hoveredUnit?: RtsUnit
  private dragState?: DragState
  private camera: CameraState = { x: 0, y: 0, scale: 1 }
  private panStart?: { screenX: number; screenY: number; cameraX: number; cameraY: number }
  private boardWidth = 0
  private boardHeight = 0
  private cols = 0
  private rows = 0
  private generation = 1
  private isPaused = false
  private simulationSpeed = 1
  private battleState: 'running' | 'playerWon' | 'enemyWon' = 'running'
  private lastWinner = '开局'
  private reinforceTimer = 1800
  private playerResources = 520
  private enemyResources = 540
  private playerBase: BaseState = { team: 'player', x: 0, y: 0, hp: 1600, maxHp: 1600 }
  private enemyBase: BaseState = { team: 'enemy', x: 0, y: 0, hp: 1800, maxHp: 1800 }
  private rngSeed = 7
  private strategicAi?: Neat
  private aiDecisionTimer = 0
  private aiGenomeIndex = 0
  private aiIntent: Record<Team, AiIntent> = {
    player: { economy: 0.62, production: 0.5, defense: 0.45, attack: 0.42, air: 0.35, tech: 0.38, lastAction: '开局部署' },
    enemy: { economy: 0.62, production: 0.5, defense: 0.45, attack: 0.42, air: 0.35, tech: 0.38, lastAction: '开局部署' },
  }
  private unitIniConfigs: Record<UnitRole, IniData> = {} as Record<UnitRole, IniData>
  private structureIniConfigs: Record<StructureKind, IniData> = {} as Record<StructureKind, IniData>
  private unitSpatialHash = new Map<string, RtsUnit[]>()
  private pathReservations = new Map<string, number>()
  private readonly qaMode = typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('qa') ?? ''
  private readonly stressMode = this.qaMode.includes('stress-1000')
  private frameCount = 0
  private mapRefreshTimer = 0
  private uiRefreshTimer = 0
  private minimapRefreshTimer = 0
  private unitDefs: Record<UnitRole, UnitDef> = {
    engineer: {
      role: 'engineer',
      name: '战地工程师',
      texture: Texture.from(engineerImageUrl),
      frameWidth: 45,
      frameHeight: 49,
      frameCount: 1,
      animationSpeed: 0,
      cost: 95,
      hp: 95,
      speed: 1.05,
      range: 112,
      damage: 6,
      cooldown: 34,
      projectileSpeed: 6.6,
      attackKind: 'scan',
      projectileSize: 2,
      width: 30,
      height: 34,
      color: 0xfbbf24,
      builder: true,
    },
    scout: {
      role: 'scout',
      name: '侦察车',
      texture: Texture.from(scoutImageUrl),
      frameWidth: 24,
      frameHeight: 21,
      frameCount: 1,
      animationSpeed: 0,
      cost: 55,
      hp: 70,
      speed: 1.45,
      range: 118,
      damage: 8,
      cooldown: 24,
      projectileSpeed: 7.4,
      attackKind: 'scan',
      projectileSize: 2,
      width: 18,
      height: 18,
      color: 0x7dd3fc,
    },
    tank: {
      role: 'tank',
      name: '突击坦克',
      texture: Texture.from(tankImageUrl),
      frameWidth: 16,
      frameHeight: 30,
      frameCount: 3,
      animationSpeed: 0.22,
      cost: 80,
      hp: 120,
      speed: 1.0,
      range: 145,
      damage: 18,
      cooldown: 38,
      projectileSpeed: 6.2,
      attackKind: 'cannon',
      splashRadius: 18,
      projectileSize: 3,
      width: 18,
      height: 28,
      color: 0x67e8a5,
      turretTexture: Texture.from(tankTurretImageUrl),
      turretWidth: 10,
      turretHeight: 34,
      turretOffsetY: -5,
    },
    plasma: {
      role: 'plasma',
      name: '等离子坦克',
      texture: Texture.from(plasmaTankImageUrl),
      frameWidth: 26,
      frameHeight: 29,
      frameCount: 2,
      animationSpeed: 0.18,
      cost: 110,
      hp: 95,
      speed: 0.92,
      range: 178,
      damage: 27,
      cooldown: 56,
      projectileSpeed: 5.4,
      attackKind: 'laser',
      projectileSize: 2,
      width: 26,
      height: 29,
      color: 0x8aa1ff,
      turretTexture: Texture.from(plasmaTurretImageUrl),
      turretWidth: 14,
      turretHeight: 36,
      turretOffsetY: -7,
    },
    mammoth: {
      role: 'mammoth',
      name: '猛犸重坦',
      texture: Texture.from(mammothTankImageUrl),
      frameWidth: 30,
      frameHeight: 41,
      frameCount: 3,
      animationSpeed: 0.14,
      cost: 150,
      hp: 260,
      speed: 0.58,
      range: 168,
      damage: 42,
      cooldown: 78,
      projectileSpeed: 4.8,
      attackKind: 'cannon',
      splashRadius: 28,
      projectileSize: 4.5,
      width: 34,
      height: 46,
      color: 0xffc857,
      turretTexture: Texture.from(mammothTurretImageUrl),
      turretWidth: 12,
      turretHeight: 44,
      turretOffsetY: -7,
      turretTurnRate: 0.08,
    },
    helicopter: {
      role: 'helicopter',
      name: '武装直升机',
      texture: Texture.from(helicopterImageUrl),
      frameWidth: 26,
      frameHeight: 46,
      frameCount: 1,
      animationSpeed: 0,
      cost: 100,
      hp: 85,
      speed: 1.65,
      range: 158,
      damage: 14,
      cooldown: 28,
      projectileSpeed: 7.8,
      attackKind: 'rapid',
      projectileSize: 2.4,
      width: 28,
      height: 48,
      color: 0xf472b6,
      flying: true,
      rotorTexture: Texture.from(helicopterBladesImageUrl),
      rotorWidth: 46,
      rotorHeight: 20,
      rotorOffsetY: -8,
      rotorSpin: 0.85,
    },
    missile: {
      role: 'missile',
      name: '导弹坦克',
      texture: Texture.from(missileTankImageUrl),
      frameWidth: 30,
      frameHeight: 39,
      frameCount: 2,
      animationSpeed: 0.17,
      cost: 135,
      hp: 150,
      speed: 0.68,
      range: 225,
      damage: 36,
      cooldown: 74,
      projectileSpeed: 4.6,
      attackKind: 'missile',
      splashRadius: 34,
      projectileSize: 4,
      width: 30,
      height: 39,
      color: 0xff8a4c,
      turretTexture: Texture.from(missileTurretImageUrl),
      turretWidth: 24,
      turretHeight: 28,
      turretOffsetY: -5,
    },
    laser: {
      role: 'laser',
      name: '激光坦克',
      texture: Texture.from(laserTankImageUrl),
      frameWidth: 24,
      frameHeight: 29,
      frameCount: 3,
      animationSpeed: 0.2,
      cost: 125,
      hp: 115,
      speed: 0.72,
      range: 198,
      damage: 31,
      cooldown: 58,
      projectileSpeed: 8.4,
      attackKind: 'laser',
      projectileSize: 2,
      width: 26,
      height: 31,
      color: 0x5eead4,
      turretTexture: Texture.from(laserTurretImageUrl),
      turretWidth: 10,
      turretHeight: 36,
      turretOffsetY: -8,
    },
    artillery: {
      role: 'artillery',
      name: '自行火炮',
      texture: Texture.from(artilleryImageUrl),
      frameWidth: 24,
      frameHeight: 47,
      frameCount: 3,
      animationSpeed: 0.12,
      cost: 95,
      hp: 90,
      speed: 0.76,
      range: 285,
      damage: 45,
      cooldown: 92,
      projectileSpeed: 4.0,
      attackKind: 'artillery',
      splashRadius: 46,
      projectileSize: 4.5,
      width: 27,
      height: 48,
      color: 0xfacc15,
    },
    heavyArtillery: {
      role: 'heavyArtillery',
      name: '重型火炮',
      texture: Texture.from(heavyArtilleryImageUrl),
      frameWidth: 29,
      frameHeight: 38,
      frameCount: 2,
      animationSpeed: 0.1,
      cost: 165,
      hp: 178,
      speed: 0.54,
      range: 330,
      damage: 72,
      cooldown: 128,
      projectileSpeed: 3.7,
      attackKind: 'artillery',
      splashRadius: 62,
      projectileSize: 5.4,
      width: 32,
      height: 42,
      color: 0xfb923c,
      turretTexture: Texture.from(heavyArtilleryTurretImageUrl),
      turretWidth: 15,
      turretHeight: 62,
      turretOffsetY: -12,
      turretTurnRate: 0.06,
    },
    experimental: {
      role: 'experimental',
      name: '实验坦克',
      texture: Texture.from(experimentalTankImageUrl),
      frameWidth: 62,
      frameHeight: 86,
      frameCount: 3,
      animationSpeed: 0.12,
      cost: 260,
      hp: 620,
      speed: 0.36,
      range: 240,
      damage: 86,
      cooldown: 112,
      projectileSpeed: 4.6,
      attackKind: 'cannon',
      splashRadius: 72,
      projectileSize: 6,
      width: 58,
      height: 78,
      color: 0xc084fc,
      turretTexture: Texture.from(experimentalTurretImageUrl),
      turretWidth: 18,
      turretHeight: 56,
      turretOffsetY: -14,
      turretTurnRate: 0.05,
    },
    interceptor: {
      role: 'interceptor',
      name: '拦截机',
      texture: Texture.from(interceptorImageUrl),
      frameWidth: 24,
      frameHeight: 22,
      frameCount: 1,
      animationSpeed: 0,
      cost: 75,
      hp: 62,
      speed: 2.15,
      range: 132,
      damage: 10,
      cooldown: 18,
      projectileSpeed: 9.2,
      attackKind: 'rapid',
      projectileSize: 2,
      width: 26,
      height: 24,
      color: 0x93c5fd,
      flying: true,
    },
    heavyInterceptor: {
      role: 'heavyInterceptor',
      name: '重拦截机',
      texture: Texture.from(heavyInterceptorImageUrl),
      frameWidth: 32,
      frameHeight: 35,
      frameCount: 1,
      animationSpeed: 0,
      cost: 115,
      hp: 110,
      speed: 1.95,
      range: 165,
      damage: 18,
      cooldown: 26,
      projectileSpeed: 8.8,
      attackKind: 'bullet',
      projectileSize: 2.8,
      width: 32,
      height: 35,
      color: 0x60a5fa,
      flying: true,
    },
    bomber: {
      role: 'bomber',
      name: '轰炸机',
      texture: Texture.from(bomberImageUrl),
      frameWidth: 45,
      frameHeight: 47,
      frameCount: 1,
      animationSpeed: 0,
      cost: 170,
      hp: 155,
      speed: 0.88,
      range: 198,
      damage: 60,
      cooldown: 96,
      projectileSpeed: 5.2,
      attackKind: 'bomb',
      splashRadius: 58,
      projectileSize: 5.2,
      width: 45,
      height: 47,
      color: 0xf97316,
      flying: true,
    },
    gunship: {
      role: 'gunship',
      name: '轻炮艇',
      texture: Texture.from(lightGunshipImageUrl),
      frameWidth: 24,
      frameHeight: 20,
      frameCount: 2,
      animationSpeed: 0.44,
      cost: 85,
      hp: 78,
      speed: 1.32,
      range: 150,
      damage: 16,
      cooldown: 30,
      projectileSpeed: 7.8,
      attackKind: 'rapid',
      projectileSize: 2.6,
      width: 28,
      height: 24,
      color: 0xa78bfa,
      flying: true,
    },
    spyDrone: {
      role: 'spyDrone',
      name: '侦察无人机',
      texture: Texture.from(spyDroneImageUrl),
      frameWidth: 45,
      frameHeight: 47,
      frameCount: 1,
      animationSpeed: 0,
      cost: 60,
      hp: 42,
      speed: 2.35,
      range: 118,
      damage: 5,
      cooldown: 18,
      projectileSpeed: 8.8,
      attackKind: 'scan',
      splashRadius: 22,
      projectileSize: 1.8,
      width: 28,
      height: 30,
      color: 0x22d3ee,
      flying: true,
    },
    fireBee: {
      role: 'fireBee',
      name: '火蜂',
      texture: Texture.from(fireBeeImageUrl),
      frameWidth: 43,
      frameHeight: 57,
      frameCount: 2,
      animationSpeed: 0.2,
      cost: 240,
      hp: 420,
      speed: 1.08,
      range: 188,
      damage: 34,
      cooldown: 24,
      projectileSpeed: 8.0,
      attackKind: 'rapid',
      splashRadius: 12,
      projectileSize: 3,
      width: 46,
      height: 58,
      color: 0xff5d73,
      flying: true,
    },
  }
  private projectiles: Projectile[] = []
  private explosions: Explosion[] = []
  private beams: BeamEffect[] = []
  private terrainTextures: Record<TerrainType, Texture> = {
    shortGrass: createTileTexture(shortGrassTileUrl),
    longGrass: createTileTexture(longGrassTileUrl),
    dirt: createTileTexture(dirtTileUrl),
    sand: createTileTexture(sandTileUrl),
    stone: createTileTexture(stoneTileUrl),
    mountain: createTileTexture(mountainTileUrl),
    water: createTileTexture(waterTileUrl),
    deepWater: createTileTexture(deepWaterTileUrl),
    shallowWater: createTileTexture(shallowWaterTileUrl),
  }

  constructor(host: HTMLElement) {
    this.host = host
    const strategicHyperparams = new Hyperparameters()
    strategicHyperparams.default_activation = activation.TANH
    this.strategicAi = new Neat(8, 6, 8, strategicHyperparams)

    this.app = new Application({
      backgroundColor: 0x10131a,
      antialias: false,
      autoDensity: true,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      resizeTo: host,
    })

    this.uiTitle = new Text('', new TextStyle({
      fill: 0xf2f5ff,
      fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
      fontSize: 18,
      fontWeight: '700',
    }))
    this.uiStats = new Text('', new TextStyle({
      fill: 0xcdd5f5,
      fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
      fontSize: 13,
      lineHeight: 24,
      wordWrap: true,
      wordWrapWidth: SIDEBAR_WIDTH - 44,
    }))
    this.uiCommands = new Text('', new TextStyle({
      fill: 0x22ff55,
      fontFamily: 'Menlo, Consolas, monospace',
      fontSize: 11,
      lineHeight: 31,
      wordWrap: false,
    }))

    this.worldLayer.addChild(this.terrainLayer as any)
    this.worldLayer.addChild(this.mapLayer as any)
    this.worldLayer.addChild(this.structureLayer as any)
    this.worldLayer.addChild(this.wreckLayer as any)
    this.worldLayer.addChild(this.pathLayer as any)
    this.worldLayer.addChild(this.unitLayer as any)
    this.worldLayer.addChild(this.effectLayer as any)
    this.worldLayer.addChild(this.overlayLayer as any)
    this.app.stage.addChild(this.worldLayer as any)
    this.uiLayer.addChild(this.uiBackground as any, this.uiTitle as any, this.uiStats as any, this.uiCommands as any)
    this.app.stage.addChild(this.uiLayer as any)
    this.app.stage.addChild(this.minimapLayer as any)

    this.host.appendChild(this.app.view as HTMLCanvasElement)
    this.host.addEventListener('contextmenu', this.preventMenu)
    this.app.view.addEventListener('pointerdown', this.handlePointerDown)
    this.app.view.addEventListener('pointermove', this.handlePointerMove)
    this.app.view.addEventListener('pointerup', this.handlePointerUp)
    this.app.view.addEventListener('pointerleave', this.handlePointerUp)
    this.app.view.addEventListener('wheel', this.handleWheel, { passive: false })
    window.addEventListener('keydown', this.handleKeyDown)

    this.resizeObserver = new ResizeObserver(() => this.rebuildWorld())
    this.resizeObserver.observe(this.host)

    this.applyIniConfigs()
    this.rebuildWorld()
    this.app.ticker.add(this.update)
  }

  destroy() {
    this.app.ticker.remove(this.update)
    this.resizeObserver.disconnect()
    this.host.removeEventListener('contextmenu', this.preventMenu)
    this.app.view.removeEventListener('pointerdown', this.handlePointerDown)
    this.app.view.removeEventListener('pointermove', this.handlePointerMove)
    this.app.view.removeEventListener('pointerup', this.handlePointerUp)
    this.app.view.removeEventListener('pointerleave', this.handlePointerUp)
    this.app.view.removeEventListener('wheel', this.handleWheel)
    window.removeEventListener('keydown', this.handleKeyDown)
    this.app.destroy(true, { children: true, texture: false, baseTexture: false })
  }

  private preventMenu = (event: MouseEvent) => {
    event.preventDefault()
  }

  private applyIniConfigs() {
    for (const role of Object.keys(UNIT_INI_RAW) as UnitRole[]) {
      const config = this.parseIni(UNIT_INI_RAW[role])
      this.unitIniConfigs[role] = config
      this.applyUnitIniConfig(role, config)
    }

    for (const kind of Object.keys(STRUCTURE_INI_RAW) as StructureKind[]) {
      this.structureIniConfigs[kind] = this.mergeIniConfigs(STRUCTURE_INI_RAW[kind].map((raw) => this.parseIni(raw)))
    }
  }

  private parseIni(raw: string): IniData {
    const data: IniData = {}
    let section = ''

    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const header = trimmed.match(/^\[([^\]]+)\]$/)
      if (header) {
        section = header[1].trim().toLowerCase()
        if (!data[section]) data[section] = {}
        continue
      }

      const separator = trimmed.indexOf(':')
      if (separator < 0 || !section || section.startsWith('comment_')) continue
      const key = trimmed.slice(0, separator).trim().toLowerCase()
      const value = trimmed.slice(separator + 1).trim()
      if (key) data[section][key] = value
    }

    return data
  }

  private mergeIniConfigs(configs: IniData[]) {
    const merged: IniData = {}
    for (const config of configs) {
      for (const [section, values] of Object.entries(config)) {
        merged[section] = { ...(merged[section] ?? {}), ...values }
      }
    }
    return merged
  }

  private applyUnitIniConfig(role: UnitRole, config: IniData) {
    const def = this.unitDefs[role]
    const core = config.core ?? {}
    const graphics = config.graphics ?? {}
    const attack = config.attack ?? {}
    const movement = config.movement ?? {}
    const projectile = this.primaryProjectile(config)
    const movementType = movement.movementtype?.toUpperCase()
    const price = this.iniNumber(core.price)
    const hp = this.iniNumber(core.maxhp)
    const moveSpeed = this.iniNumber(movement.movespeed)
    const acceleration = this.iniNumber(movement.moveaccelerationspeed)
    const brake = this.iniNumber(movement.movedecelerationspeed)
    const maxTurnSpeed = this.iniNumber(movement.maxturnspeed)
    const frameCount = this.iniNumber(graphics.total_frames)
    const animationSpeed = this.iniNumber(graphics.animation_moving_speed)
    const attackRange = this.iniNumber(attack.maxattackrange)
    const shootDelay = this.iniNumber(attack.shootdelay)
    const damage = this.iniProjectileDamage(projectile)
    const projectileSpeed = this.iniNumber(projectile.targetspeed) ?? this.iniNumber(projectile.speed)
    const areaRadius = this.iniNumber(projectile.arearadius)
    const turretTurn = this.iniNumber(attack.turretturnspeed)
    const turretSize = this.iniNumber(attack.turretsize)
    const turretConfig = this.primaryVisibleTurret(config)
    const turretX = this.iniNumber(turretConfig.x)
    const turretY = this.iniNumber(turretConfig.y)
    const unitScaleX = def.width / Math.max(1, def.frameWidth)
    const unitScaleY = def.height / Math.max(1, def.frameHeight)
    const turretImage = this.normalizeIniAssetName(graphics.image_turret)
    const turretUrl = turretImage ? this.unitAssetUrl(role, turretImage) : undefined

    def.iniName = core.name ?? role
    def.techLevel = this.iniNumber(core.techlevel)
    def.buildSpeed = this.iniNumber(core.buildspeed)
    def.isBuildingConfig = this.iniBoolean(core.isbuilding)
    def.builder = def.builder || this.iniBoolean(core.isbuilder) || this.iniBoolean(config.ai?.useasbuilder)
    def.movementType = movementType
    def.attackMovement = attack.attackmovement?.trim().toLowerCase()
    def.flying = def.flying || movementType === 'AIR'
    if (attack.canattackflyingunits !== undefined) def.canAttackFlying = this.iniBoolean(attack.canattackflyingunits)
    if (attack.canattacklandunits !== undefined) def.canAttackLand = this.iniBoolean(attack.canattacklandunits)
    if (turretUrl) {
      const texture = Texture.from(turretUrl)
      def.turretTexture = texture
      if (!def.turretWidth) def.turretWidth = turretSize ?? Math.max(8, texture.width || def.width * 0.55)
      if (!def.turretHeight) def.turretHeight = Math.max(def.turretWidth * 1.25, texture.height || def.height * 1.2)
    }
    def.fixedFiring = this.iniBoolean(attack.isfixedfiring) || attack.turretrotatewithbody === 'true' || !def.turretTexture

    if (price) def.cost = this.normalizeUnitCost(price)
    if (hp) {
      def.hp = this.normalizeUnitHp(hp)
      if (role === 'engineer') def.hp = Math.max(95, Math.round(def.hp * 0.55))
    }
    if (moveSpeed && moveSpeed > 0) def.speed = moveSpeed
    if (acceleration) def.acceleration = acceleration
    if (brake) def.brake = brake
    if (maxTurnSpeed) def.turnRate = Math.max(0.018, Math.min(0.085, maxTurnSpeed * 0.034))
    if (frameCount && frameCount > 0) def.frameCount = frameCount
    if (animationSpeed) def.animationSpeed = Math.max(0.08, animationSpeed * 0.1)
    if (attackRange) def.range = attackRange
    if (shootDelay) def.cooldown = shootDelay
    if (damage) def.damage = damage
    if (projectileSpeed) def.projectileSpeed = Math.max(0.25, projectileSpeed)
    if (areaRadius) def.splashRadius = areaRadius
    if (turretTurn) def.turretTurnRate = Math.max(def.turretTurnRate ?? 0, turretTurn * 0.018)
    if (turretX !== undefined) def.turretOffsetX = turretX * unitScaleX
    if (turretY !== undefined) def.turretOffsetY = -turretY * unitScaleY
    if (def.turretTexture && !def.turretAnchorY) {
      def.turretAnchorY = (def.turretHeight ?? 0) > (def.turretWidth ?? def.width) * 1.45 ? 0.62 : 0.5
    }
    def.turretParts = this.resolveUnitTurretParts(role, config, def)
    def.weapons = this.resolveUnitWeapons(role, config, def)
    const primaryWeapon = def.weapons[0]
    if (primaryWeapon) {
      def.attackKind = primaryWeapon.kind
      def.damage = primaryWeapon.damage
      def.cooldown = primaryWeapon.cooldown
      def.projectileSpeed = primaryWeapon.projectileSpeed
      def.splashRadius = primaryWeapon.splashRadius || undefined
      def.projectileSize = primaryWeapon.projectileSize
    } else {
      def.attackKind = this.iniAttackKind(role, def, projectile)
    }
  }

  private resolveUnitWeapons(role: UnitRole, config: IniData, def: UnitDef): WeaponDef[] {
    const projectiles = this.projectileMap(config)
    const fallbackProjectile = this.primaryProjectile(config)
    const attack = config.attack ?? {}
    const attackCooldown = this.iniTime(attack.shootdelay) ?? def.cooldown
    const turrets = this.resolvedTurretSections(config)
      .filter((turret) => turret.canshoot !== 'false' && turret.projectile)

    const sources = turrets.length > 0
      ? turrets
      : [{ id: 'primary', section: 'turret_primary', projectile: '1' } as TurretIni]

    return sources.map((turret, index) => {
      const projectile = projectiles.get(this.projectileKey(turret.projectile)) ?? fallbackProjectile
      const textureUrl = projectile.image ? this.unitAssetUrl(role, projectile.image) : undefined
      const hitTextureUrl = this.projectileHitTextureUrl(projectile)
      const directDamage = this.iniNumber(projectile.directdamage)
      const areaDamage = this.iniNumber(projectile.areadamage)
      const areaRadius = this.iniNumber(projectile.arearadius) ?? 0
      const damage = areaRadius > 0 && areaDamage !== undefined
        ? areaDamage
        : directDamage ?? areaDamage ?? def.damage
      const speed = this.iniNumber(projectile.targetspeed) ?? this.iniNumber(projectile.speed) ?? def.projectileSpeed
      const frame = this.iniNumber(projectile.frame)
      const drawSize = this.iniNumber(projectile.drawsize)
      const cooldown = this.iniTime(turret.delay) ?? attackCooldown

      return {
        id: turret.id || `weapon_${index + 1}`,
        kind: this.iniAttackKind(role, def, projectile),
        damage: this.normalizeProjectileDamage(damage),
        cooldown,
        warmup: this.iniTime(turret.warmup) ?? 0,
        projectileSpeed: Math.max(0.25, speed),
        projectileLife: this.iniTime(projectile.life) ?? (projectile.targetground === 'true' ? 150 : 100),
        splashRadius: areaRadius,
        projectileSize: Math.max(1.5, (drawSize ?? def.projectileSize ?? 1) * 3),
        projectileFrame: frame,
        projectileTexture: textureUrl ? Texture.from(textureUrl) : undefined,
        hitTexture: hitTextureUrl ? Texture.from(hitTextureUrl) : undefined,
        canAttackFlying: turret.canattackflyingunits === undefined ? def.canAttackFlying : this.iniBoolean(turret.canattackflyingunits),
        canAttackLand: turret.canattacklandunits === undefined ? def.canAttackLand : this.iniBoolean(turret.canattacklandunits),
      }
    })
  }

  private resolveUnitTurretParts(role: UnitRole, config: IniData, def: UnitDef): UnitTurretPartDef[] {
    const graphicsTurretImage = this.normalizeIniAssetName(config.graphics?.image_turret)
    const resolvedTurrets = this.resolvedTurretSections(config)
    const parts: UnitTurretPartDef[] = []

    for (const turret of resolvedTurrets) {
      const image = this.normalizeIniAssetName(turret.image)
      if (!image || image === graphicsTurretImage) continue

      const url = this.unitAssetUrl(role, image)
      if (!url) continue

      const attach = turret.attachedto ? this.findResolvedTurret(resolvedTurrets, turret.attachedto) : undefined
      const x = (this.iniNumber(turret.x) ?? 0) + (attach ? this.iniNumber(attach.x) ?? 0 : 0)
      const y = (this.iniNumber(turret.y) ?? 0) + (attach ? this.iniNumber(attach.y) ?? 0 : 0)
      const width = def.turretWidth ?? def.width * 0.55
      const height = def.turretHeight ?? def.height * 1.2

      parts.push({
        texture: Texture.from(url),
        x: x * (def.width / Math.max(1, def.frameWidth)),
        y: -y * (def.height / Math.max(1, def.frameHeight)),
        width,
        height,
        anchorY: def.turretAnchorY ?? (height > width * 1.45 ? 0.62 : 0.5),
      })
    }

    return parts
  }

  private resolvedTurretSections(config: IniData): TurretIni[] {
    const entries = Object.entries(config)
      .filter(([section]) => section.startsWith('turret_'))
      .map(([section, values]) => ({ section, id: section.replace(/^turret_/, ''), ...values }) as TurretIni)

    const byId = new Map(entries.flatMap((entry) => [
      [entry.id.toLowerCase(), entry],
      [entry.section.toLowerCase(), entry],
    ]))

    const resolve = (entry: TurretIni, seen = new Set<string>()): TurretIni => {
      const key = entry.id.toLowerCase()
      if (seen.has(key) || !entry.copyfrom) return entry
      seen.add(key)
      const parent = this.findResolvedTurret(entries, entry.copyfrom, byId)
      return parent ? { ...resolve(parent, seen), ...entry } : entry
    }

    return entries.map((entry) => resolve(entry))
  }

  private findResolvedTurret<T extends { id: string; section: string }>(turrets: T[], rawId: string, byId?: Map<string, T>) {
    const normalized = rawId.trim().toLowerCase().replace(/^turret_/, '')
    return byId?.get(normalized)
      ?? byId?.get(`turret_${normalized}`)
      ?? turrets.find((turret) => turret.id.toLowerCase() === normalized || turret.section.toLowerCase() === `turret_${normalized}`)
  }

  private normalizeIniAssetName(value?: string) {
    const normalized = value?.trim()
    if (!normalized || normalized.toUpperCase() === 'NONE') return undefined
    return normalized
  }

  private unitAssetUrl(role: UnitRole, rawImage: string) {
    const image = rawImage.trim()
    const shared = image.match(/^SHARED:(.+)$/i)?.[1]
    if (shared) return this.assetUrlForPath(`shared/${shared}`)

    const core = image.match(/^CORE:(.+)$/i)?.[1]
    if (core) return this.assetUrlForPath(core)

    const unitDir = UNIT_ASSET_DIRS[role]
    return this.assetUrlForPath(`${unitDir}/${image}`) ?? this.assetUrlForPath(`shared/${image}`)
  }

  private assetUrlForPath(path: string) {
    const normalized = path.replace(/^\/+/, '').toLowerCase()
    const found = Object.entries(UNIT_ASSET_URLS).find(([assetPath]) => (
      assetPath.toLowerCase().endsWith(`/assets/units/${normalized}`)
    ))
    return found?.[1]
  }

  private primaryProjectile(config: IniData) {
    const projectileSections = Object.entries(config)
      .filter(([section]) => section.startsWith('projectile_'))
      .map(([, values]) => values)
    return projectileSections.find((projectile) => projectile.directdamage || projectile.areadamage) ?? projectileSections[0] ?? {}
  }

  private projectileMap(config: IniData) {
    const map = new Map<string, Record<string, string>>()
    for (const [section, values] of Object.entries(config)) {
      if (!section.startsWith('projectile_')) continue
      map.set(this.projectileKey(section.replace(/^projectile_/, '')), values)
    }
    return map
  }

  private projectileKey(value?: string) {
    return (value ?? '1').trim().toLowerCase().replace(/^projectile_/, '')
  }

  private primaryVisibleTurret(config: IniData) {
    const turretSections = Object.entries(config)
      .filter(([section]) => section.startsWith('turret_'))
      .map(([, values]) => values)
    return turretSections.find((turret) => turret.invisible !== 'true') ?? turretSections[0] ?? {}
  }

  private iniAttackKind(role: UnitRole, def: UnitDef, projectile: Record<string, string>): AttackKind {
    if (role === 'bomber') return 'bomb'
    if (role === 'missile' || projectile.traileffect === 'true' || projectile.ballistic === 'true') return 'missile'
    if (projectile.lightingeffect === 'true') return 'lightning'
    if (projectile.beamimage || projectile.beamimagestart || projectile.beamimageend) return 'beam'
    if (projectile.lasereffect === 'true' || projectile.instant === 'true') return 'laser'
    if (projectile.targetground === 'true' || this.iniNumber(projectile.arearadius)) {
      return def.range > 230 ? 'artillery' : 'cannon'
    }
    if (def.canAttackFlying && !def.canAttackLand) return 'rapid'
    return def.attackKind ?? 'bullet'
  }

  private projectileHitTextureUrl(projectile: Record<string, string>) {
    const effectNames = `${projectile.explodeeffect ?? ''},${projectile.explodeeffectonshield ?? ''}`.toLowerCase()
    if (projectile.lightingeffect === 'true' || effectNames.includes('lightningshock')) {
      return this.assetUrlForPath('shared/lightning_shock.png')
    }
    if (effectNames.includes('hitlightflash') || projectile.lasereffect === 'true') {
      return this.assetUrlForPath('shared/light_50.png')
    }
    return undefined
  }

  private iniProjectileDamage(projectile: Record<string, string>) {
    const areaRadius = this.iniNumber(projectile.arearadius)
    const areaDamage = this.iniNumber(projectile.areadamage)
    const rawDamage = areaRadius && areaDamage !== undefined
      ? areaDamage
      : this.iniNumber(projectile.directdamage) ?? areaDamage
    if (!rawDamage) return undefined
    return this.normalizeProjectileDamage(rawDamage)
  }

  private normalizeProjectileDamage(rawDamage: number) {
    return rawDamage > 60 ? Math.round(Math.sqrt(rawDamage) * 5) : rawDamage
  }

  private iniNumber(value?: string) {
    const match = value?.match(/-?\d+(\.\d+)?/)
    return match ? Number(match[0]) : undefined
  }

  private iniTime(value?: string) {
    const amount = this.iniNumber(value)
    if (amount === undefined) return undefined
    return value?.trim().toLowerCase().endsWith('s') ? amount * 60 : amount
  }

  private iniBoolean(value?: string) {
    return value?.trim().toLowerCase() === 'true'
  }

  private normalizeUnitCost(price: number) {
    return Math.max(45, Math.min(420, Math.round(Math.sqrt(price) * 3.9)))
  }

  private normalizeUnitHp(hp: number) {
    return Math.max(42, Math.min(680, Math.round(Math.sqrt(hp) * 8)))
  }

  private normalizeStructureCost(price: number) {
    return Math.max(80, Math.min(320, Math.round(Math.sqrt(price) * 5)))
  }

  private normalizeStructureHp(hp: number) {
    return Math.max(160, Math.min(520, Math.round(Math.sqrt(hp) * 10)))
  }

  private handlePointerDown = (event: PointerEvent) => {
    const point = this.eventToBoardPoint(event)

    if (event.button === 1 || event.altKey) {
      event.preventDefault()
      this.panStart = {
        screenX: event.clientX,
        screenY: event.clientY,
        cameraX: this.camera.x,
        cameraY: this.camera.y,
      }
      return
    }

    if (!point) {
      this.selectedUnits = []
      this.selectedCell = undefined
      this.dragState = undefined
      this.drawOverlay()
      this.drawPath()
      return
    }

    if (event.button === 2) {
      event.preventDefault()
      this.commandSelectedUnits(this.pixelToCell(point.x, point.y))
      return
    }

    this.dragState = {
      button: event.button,
      moved: false,
      screenStartX: event.clientX,
      screenStartY: event.clientY,
      worldStart: point,
      worldCurrent: point,
    }
  }

  private handlePointerMove = (event: PointerEvent) => {
    if (this.panStart) {
      this.camera.x = this.panStart.cameraX + event.clientX - this.panStart.screenX
      this.camera.y = this.panStart.cameraY + event.clientY - this.panStart.screenY
      this.clampCamera()
      this.applyCamera()
      return
    }

    if (!this.dragState) return

    const point = this.eventToBoardPoint(event)
    if (!point) return

    const dx = event.clientX - this.dragState.screenStartX
    const dy = event.clientY - this.dragState.screenStartY
    this.dragState.moved = this.dragState.moved || Math.hypot(dx, dy) > 6
    this.dragState.worldCurrent = point
    this.drawOverlay()
  }

  private handlePointerUp = (event: PointerEvent) => {
    if (this.panStart) {
      this.panStart = undefined
      return
    }

    if (!this.dragState || this.dragState.button !== 0) return

    const point = this.eventToBoardPoint(event) ?? this.dragState.worldCurrent
    if (this.dragState.moved) {
      this.selectedUnits = this.findUnitsInRect(this.dragState.worldStart, point)
      this.selectedCell = undefined
      this.activeBuilder = this.selectedUnits.find((unit) => unit.def.builder) ?? this.activeBuilder
    } else {
      const unit = this.findUnitAt(point.x, point.y, 'player')
      if (unit) {
        this.selectedUnits = [unit]
        this.selectedCell = undefined
        if (unit.def.builder) this.activeBuilder = unit
      } else {
        this.selectedUnits = []
        this.selectedCell = this.pixelToCell(point.x, point.y)
      }
    }

    this.dragState = undefined
    this.drawOverlay()
    this.drawPath()
  }

  private handleWheel = (event: WheelEvent) => {
    const point = this.eventToScreenPoint(event)
    if (!point) return

    event.preventDefault()
    const worldBefore = this.screenToWorld(point.x, point.y)
    const nextScale = Math.max(0.7, Math.min(1.8, this.camera.scale * (event.deltaY > 0 ? 0.9 : 1.1)))
    this.camera.scale = nextScale
    this.camera.x = point.x - worldBefore.x * nextScale
    this.camera.y = point.y - worldBefore.y * nextScale
    this.clampCamera()
    this.applyCamera()
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault()
      this.isPaused = !this.isPaused
      this.drawUi()
    }

    if (event.code === 'KeyR') {
      event.preventDefault()
      this.rebuildWorld()
    }

    const production = PRODUCTION_BINDINGS.find((binding) => binding.code === event.code)
    if (production) {
      event.preventDefault()
      this.produceUnit(production.role)
    }

    if (event.code === 'KeyT') this.buildStructureAtSelection('turret')
    if (event.code === 'KeyY') this.buildStructureAtSelection('extractor')
	    if (event.code === 'KeyU') this.buildStructureAtSelection('radar')
	    if (event.code === 'KeyI') this.buildStructureAtSelection('repair')
	    if (event.code === 'KeyO') this.buildStructureAtSelection('factory')
	    if (event.code === 'KeyP') this.buildStructureAtSelection('airfield')
    if (event.code === 'Digit1') this.setSimulationSpeed(0.5)
    if (event.code === 'Digit2') this.setSimulationSpeed(1)
    if (event.code === 'Digit3') this.setSimulationSpeed(2)
    if (event.code === 'Equal' || event.code === 'NumpadAdd') this.setSimulationSpeed(this.simulationSpeed + 0.25)
    if (event.code === 'Minus' || event.code === 'NumpadSubtract') this.setSimulationSpeed(this.simulationSpeed - 0.25)
  }

  private setSimulationSpeed(speed: number) {
    this.simulationSpeed = Math.max(0.25, Math.min(3, speed))
    this.drawUi()
  }

  private startingUnitCount(team: Team) {
    if (this.stressMode) return STRESS_UNIT_COUNT
    return team === 'player' ? PLAYER_UNIT_COUNT : ENEMY_UNIT_COUNT
  }

	  private unitCap(team: Team, bonus: number) {
	    return this.startingUnitCount(team) + bonus + 14
	  }

	  private produceUnit(role: UnitRole) {
	    if (this.isBaseProducedRole(role)) {
	      this.queueBaseProduction('player', role)
	      return
	    }
	
	    const producerKind: StructureKind = this.isAirProducedRole(role) ? 'airfield' : 'factory'
	    const producer = this.completedTeamStructures('player', producerKind)
	      .filter((structure) => !structure.production)
	      .sort((a, b) => a.attackCooldown - b.attackCooldown)[0]
	    if (producer) this.queueStructureProduction(producer, role)
	  }
	
	  private isBaseProducedRole(role: UnitRole) {
	    return role === 'engineer' || role === 'scout' || role === 'tank'
	  }
	
	  private isAirProducedRole(role: UnitRole) {
	    return this.unitDefs[role].flying === true
	  }
	
	  private isFactoryProducedRole(role: UnitRole) {
	    return !this.isBaseProducedRole(role) && !this.isAirProducedRole(role)
	  }

	  private queueBaseProduction(team: Team, role: UnitRole) {
	    if (!this.isBaseProducedRole(role)) return false
	    const base = team === 'player' ? this.playerBase : this.enemyBase
	    if (base.production) return false
    const alive = this.units.filter((unit) => unit.team === team && !unit.dead).length
    const cap = this.unitCap(team, 20)
    if (alive >= cap) return false

    const cost = this.unitCost(role)
    if (!this.spendResources(team, cost)) return false

    base.production = {
      role,
      progress: 0,
      duration: this.unitProductionDuration(role) * 0.85,
    }
    this.drawUi()
    return true
  }

  private buildStructureAtSelection(kind: StructureKind) {
    const cost = this.structureCost(kind)
    if (!this.selectedCell || this.playerResources < cost) return
    const builder = this.activeBuilder
    if (!builder || builder.dead || builder.team !== 'player' || !builder.def.builder) return
    if (!this.canBuildAt(this.selectedCell, kind, builder)) return

    this.buildStructureForTeam('player', builder, this.selectedCell, kind)
    this.selectedCell = undefined
    this.drawUi()
  }

  private structureCost(kind: StructureKind) {
    const price = this.iniNumber(this.structureIniConfigs[kind]?.core?.price)
    if (price) return this.normalizeStructureCost(price)
    if (kind === 'extractor') return 120
	    if (kind === 'radar') return 90
	    if (kind === 'repair') return 130
	    if (kind === 'factory') return 220
	    if (kind === 'airfield') return 210
	    return 140
	  }

  private unitCost(role: UnitRole) {
    return this.unitDefs[role].cost
  }

  private unitProductionDuration(role: UnitRole) {
    const cost = this.unitCost(role)
    if (role === 'engineer') return 165
    if (role === 'scout' || role === 'spyDrone') return 120
    if (this.unitDefs[role].flying) return 190 + cost * 0.65
    return Math.max(135, Math.min(440, 95 + cost * 1.15))
  }

  private resourcesFor(team: Team) {
    return team === 'player' ? this.playerResources : this.enemyResources
  }

  private addResources(team: Team, amount: number) {
    if (team === 'player') this.playerResources += amount
    else this.enemyResources += amount
  }

  private spendResources(team: Team, amount: number) {
    if (this.resourcesFor(team) < amount) return false
    if (team === 'player') this.playerResources -= amount
    else this.enemyResources -= amount
    return true
  }

  private canBuildAt(cell: GridPoint, kind: StructureKind = 'turret', builder?: RtsUnit) {
    if (!this.isBuildCellOpen(cell, kind)) return false
    const x = cell.x * GRID_SIZE + GRID_SIZE / 2
    const y = cell.y * GRID_SIZE + GRID_SIZE / 2
    return builder ? Math.hypot(x - builder.x, y - builder.y) < 300 : false
  }

	  private isBuildCellOpen(cell: GridPoint, kind: StructureKind = 'turret') {
	    if (!this.isCellPassable(cell.x, cell.y)) return false
	    const x = cell.x * GRID_SIZE + GRID_SIZE / 2
	    const y = cell.y * GRID_SIZE + GRID_SIZE / 2
	    const occupied = this.structures.some((structure) => !structure.dead && Math.hypot(structure.x - x, structure.y - y) < GRID_SIZE * 2)
	    const extractorOk = kind !== 'extractor' || this.resourceNodes.some((node) => (
	      Math.hypot(node.x - x, node.y - y) < 125 &&
	      !this.resourceHasExtractor(node)
	    ))
	    return extractorOk && !occupied
	  }

	  private buildStructureForTeam(team: Team, builder: RtsUnit, cell: GridPoint, kind: StructureKind, allowDistantBlueprint = false) {
	    const cost = this.structureCost(kind)
	    if (!builder.def.builder || builder.dead || builder.team !== team) return false
	    if (this.isBuilderConstructing(builder)) return false
	    if (allowDistantBlueprint) {
	      if (!this.isBuildCellOpen(cell, kind)) return false
	    } else if (!this.canBuildAt(cell, kind, builder)) return false
	    if (!this.spendResources(team, cost)) return false

    const structure = this.createStructure(team, cell, kind)
    structure.construction = {
      builderId: builder.id,
      progress: 0,
      duration: Math.max(90, Math.min(220, 70 + this.structureCost(kind) * 0.45)),
    }
	    structure.hp = Math.max(1, structure.maxHp * 0.18)
	    this.structures.push(structure)
	    if (Math.hypot(builder.x - structure.x, builder.y - structure.y) <= 96) {
	      this.spawnEngineerWorkEffect(builder, structure.x, structure.y, team === 'player' ? 0x67e8a5 : 0xff6b6b, true)
	    }
    builder.commandUntil = structure.construction.duration
    builder.aiCooldown = 20
    builder.target = undefined
    if (team === 'player') this.activeBuilder = builder
    return true
  }

  private commandSelectedUnits(target: GridPoint) {
    if (this.selectedUnits.length === 0) return

    const formation = this.selectedUnits.length
    const cols = Math.ceil(Math.sqrt(formation))
    const rows = Math.ceil(formation / cols)

    this.selectedUnits.forEach((unit, index) => {
      const offsetX = (index % cols) - (cols - 1) / 2
      const offsetY = Math.floor(index / cols) - (rows - 1) / 2
      const cell = this.findClosestWalkable({
        x: Math.round(target.x + offsetX),
        y: Math.round(target.y + offsetY),
      }, unit)

	      if (!cell) return

	      this.rebuildPathReservations(unit)
	      unit.path = this.findPath(this.pixelToCell(unit.x, unit.y), cell, unit)
	      unit.pathIndex = 0
	      this.reserveUnitPath(unit)
	      unit.aiCooldown = 120
	      unit.target = undefined
	      unit.commandUntil = 150
	    })

    this.drawPath()
  }

  private findClosestWalkable(target: GridPoint, subject?: RtsUnit | UnitDef) {
    if (this.isCellPassable(target.x, target.y, subject)) return target

    for (let radius = 1; radius <= 6; radius++) {
      for (let x = target.x - radius; x <= target.x + radius; x++) {
        for (let y = target.y - radius; y <= target.y + radius; y++) {
          if (this.isCellPassable(x, y, subject)) return { x, y }
        }
      }
    }

    return undefined
  }

  private findUnitsInRect(start: GridPoint, end: GridPoint) {
    const left = Math.min(start.x, end.x)
    const right = Math.max(start.x, end.x)
    const top = Math.min(start.y, end.y)
    const bottom = Math.max(start.y, end.y)

    return this.units.filter((unit) => (
      unit.hp > 0 &&
      unit.team === 'player' &&
      unit.x >= left &&
      unit.x <= right &&
      unit.y >= top &&
      unit.y <= bottom
    ))
  }

  private selectAtPoint(point: GridPoint) {
    const unit = this.findUnitAt(point.x, point.y, 'player')
    if (unit) {
      this.selectedUnits = [unit]
      this.selectedCell = undefined
      if (unit.def.builder) this.activeBuilder = unit
    } else {
      this.selectedUnits = []
      this.selectedCell = this.pixelToCell(point.x, point.y)
    }

    this.drawOverlay()
    this.drawPath()
  }

  private rebuildWorld() {
    const width = Math.max(320, this.host.clientWidth)
    const height = Math.max(320, this.host.clientHeight)
    const sidebar = width >= 760 ? SIDEBAR_WIDTH : 0

    this.mapLayer.removeChildren()
	    this.boardWidth = Math.max(GRID_SIZE * 128, width - sidebar)
	    this.boardHeight = Math.max(GRID_SIZE * 76, height)
	    this.cols = Math.max(128, Math.floor(this.boardWidth / GRID_SIZE))
	    this.rows = Math.max(76, Math.floor(this.boardHeight / GRID_SIZE))
    this.boardWidth = this.cols * GRID_SIZE
    this.boardHeight = this.rows * GRID_SIZE

    this.rngSeed = 7
    this.heightMap = this.createHeightMap()
    this.terrainMap = this.createTerrainMap()
    this.map = this.createMap(this.terrainMap)
    this.playerBase = {
      team: 'player',
	      x: Math.floor(this.cols * 0.11),
	      y: Math.floor(this.rows * 0.56),
      hp: 1600,
      maxHp: 1600,
    }
    this.enemyBase = {
      team: 'enemy',
	      x: Math.floor(this.cols * 0.88),
	      y: Math.floor(this.rows * 0.56),
      hp: 1800,
      maxHp: 1800,
    }
    this.clearSafeZone(this.playerBase.x, this.playerBase.y, 5)
    this.clearSafeZone(this.enemyBase.x, this.enemyBase.y, 5)
    this.clearCorridor(this.playerBase, this.enemyBase, 2)
    this.createResourceNodes()
    this.drawTerrain()

    this.resetUnits()
    this.resetStructures()
    this.selectedUnits = []
    this.selectedCell = undefined
    this.activeBuilder = undefined
    this.dragState = undefined
    this.projectiles = []
    this.explosions = []
    this.beams = []
    this.effectLayer.removeChildren()
    this.battleState = 'running'
	    this.reinforceTimer = 1800
	    this.playerResources = 620
	    this.enemyResources = 620
    this.frameCount = 0
    this.mapRefreshTimer = 0
    this.uiRefreshTimer = 0
    this.minimapRefreshTimer = 0
    this.aiDecisionTimer = 0
    this.aiGenomeIndex = 0
    this.aiIntent.player.lastAction = '开局部署'
    this.aiIntent.enemy.lastAction = '开局部署'
    this.unitSpatialHash.clear()
    this.pathReservations.clear()
    this.camera = { x: 0, y: 0, scale: 1 }
    this.clampCamera()
    this.applyCamera()
    this.drawMap()
    this.drawOverlay()
    this.drawPath()
    this.drawUi()
    this.drawMinimap()
  }

  private createMap(terrain: TerrainType[][]) {
    const map = Array.from({ length: this.cols }, () => Array(this.rows).fill(0))

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const edge = x < 2 || y < 2 || x > this.cols - 3 || y > this.rows - 3
        const cellTerrain = terrain[x]?.[y] ?? 'shortGrass'
        map[x][y] = edge || cellTerrain === 'water' || cellTerrain === 'deepWater' || cellTerrain === 'mountain' ? 1 : 0
      }
    }

    return map
  }

  private createHeightMap() {
    const heights = Array.from({ length: this.cols }, () => Array(this.rows).fill(0))

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const ridge = this.continuousNoise(x, y, 0.048)
        const detail = this.continuousNoise(x + 83, y - 41, 0.12) * 0.28
        const valley = this.continuousNoise(x - 19, y + 67, 0.035)
        const water = this.waterDepthAt(x, y)
        const road = this.roadStrengthAt(x, y)
        const highland = this.highlandStrengthAt(x, y)
        heights[x][y] = Math.max(0, Math.min(1, ridge * 0.56 + detail + highland * 0.3 - water * 0.52 - road * 0.16 + (valley < 0.32 ? -0.1 : 0.04)))
      }
    }

    return heights
  }

  private continuousNoise(x: number, y: number, scale: number) {
    return (
      Math.sin(x * scale * 1.7) +
      Math.cos(y * scale * 1.3) +
      Math.sin((x + y) * scale * 0.9) +
      Math.cos((x - y) * scale * 1.1)
    ) * 0.125 + 0.5
  }

  private terrainForCell(x: number, y: number): TerrainType {
    const water = this.waterDepthAt(x, y)
    if (water > 0.86) return 'deepWater'
    if (water > 0.48) return 'water'
    if (water > 0.24) return 'shallowWater'

    const height = this.heightMap[x]?.[y] ?? 0
    const highland = this.highlandStrengthAt(x, y)
    const road = this.roadStrengthAt(x, y)
    const moisture = this.continuousNoise(x + 37, y - 19, 0.065)
    const biome = this.continuousNoise(x - 73, y + 11, 0.038)

    if (highland > 0.9 || height > 0.88) return 'mountain'
    if (highland > 0.68 || height > 0.75) return 'stone'
    if (road > 0.28) return 'dirt'
    if (water > 0.14) return 'sand'
    if (moisture > 0.66 || biome > 0.68) return 'longGrass'
    if (biome < 0.28) return 'sand'
    return 'shortGrass'
  }

  private waterDepthAt(x: number, y: number) {
    const nx = x / Math.max(1, this.cols - 1)
    const ny = y / Math.max(1, this.rows - 1)
    const topCenter = 0.18 + Math.sin(nx * Math.PI * 3.1) * 0.035 + (this.continuousNoise(x + 13, y - 91, 0.055) - 0.5) * 0.055
    const topRiver = this.bandStrength(ny, topCenter, 0.045) * this.rangeStrength(nx, 0.08, 0.92, 0.1)
    const eastCoastLine = 0.925 + Math.sin(ny * Math.PI * 5.8) * 0.025
    const eastCoast = Math.max(0, (nx - eastCoastLine) / 0.06) * (ny < 0.48 || ny > 0.78 ? 1 : 0.2)
    const southCoastLine = 0.885 + Math.sin(nx * Math.PI * 4.7 + 0.6) * 0.035
    const southCoast = Math.max(0, (ny - southCoastLine) / 0.08) * this.rangeStrength(nx, 0.03, 0.44, 0.08)
    const westPond = this.ellipseStrength(nx, ny, 0.14, 0.83, 0.14, 0.07)
    const eastPond = this.ellipseStrength(nx, ny, 0.74, 0.28, 0.11, 0.055)
    const lowerPond = this.ellipseStrength(nx, ny, 0.77, 0.9, 0.13, 0.055)
    return Math.max(0, Math.min(1, Math.max(topRiver, eastCoast, southCoast, westPond, eastPond, lowerPond)))
  }

  private roadStrengthAt(x: number, y: number) {
    const nx = x / Math.max(1, this.cols - 1)
    const ny = y / Math.max(1, this.rows - 1)
    const mainY = 0.56 + Math.sin(nx * Math.PI * 2.1 - 0.45) * 0.055 + Math.sin(nx * Math.PI * 6.2) * 0.018
    const mainRoad = this.bandStrength(ny, mainY, 0.038) * this.rangeStrength(nx, 0.1, 0.9, 0.08)
    const northForkX = 0.49 + Math.sin(ny * Math.PI * 4.2) * 0.025
    const northFork = this.bandStrength(nx, northForkX, 0.03) * this.rangeStrength(ny, 0.24, 0.78, 0.08)
    const playerRamp = this.ellipseStrength(nx, ny, 0.2, 0.6, 0.16, 0.07)
    const enemyRamp = this.ellipseStrength(nx, ny, 0.8, 0.53, 0.16, 0.07)
    return Math.max(mainRoad, northFork * 0.82, playerRamp * 0.58, enemyRamp * 0.58)
  }

  private highlandStrengthAt(x: number, y: number) {
    const nx = x / Math.max(1, this.cols - 1)
    const ny = y / Math.max(1, this.rows - 1)
    const northRidge = this.ellipseStrength(nx, ny, 0.35, 0.34, 0.2, 0.12)
    const centerRidgeX = 0.52 + Math.sin(ny * Math.PI * 3.4) * 0.08
    const centerRidge = this.bandStrength(nx, centerRidgeX, 0.04) * this.rangeStrength(ny, 0.25, 0.8, 0.12)
    const southRocks = this.ellipseStrength(nx, ny, 0.63, 0.76, 0.18, 0.1)
    const brokenDetail = Math.max(0, this.continuousNoise(x + 211, y - 47, 0.12) - 0.47) * 0.9
    return Math.max(northRidge, centerRidge, southRocks) * (0.62 + brokenDetail)
  }

  private bandStrength(value: number, center: number, halfWidth: number) {
    return Math.max(0, 1 - Math.abs(value - center) / Math.max(0.0001, halfWidth))
  }

  private rangeStrength(value: number, min: number, max: number, fade: number) {
    return Math.max(0, Math.min(1, (value - min) / fade, (max - value) / fade))
  }

  private ellipseStrength(nx: number, ny: number, cx: number, cy: number, rx: number, ry: number) {
    const distance = Math.sqrt(((nx - cx) / rx) ** 2 + ((ny - cy) / ry) ** 2)
    return Math.max(0, 1 - distance)
  }

  private hasNearbyTerrain(terrain: TerrainType[][], cellX: number, cellY: number, types: TerrainType[], radius: number) {
    for (let x = cellX - radius; x <= cellX + radius; x++) {
      for (let y = cellY - radius; y <= cellY + radius; y++) {
        if (x === cellX && y === cellY) continue
        if (!this.isInside(x, y)) continue
        if (types.includes(terrain[x]?.[y] ?? 'shortGrass')) return true
      }
    }
    return false
  }

  private hasNearbyLand(terrain: TerrainType[][], cellX: number, cellY: number, radius: number) {
    for (let x = cellX - radius; x <= cellX + radius; x++) {
      for (let y = cellY - radius; y <= cellY + radius; y++) {
        if (x === cellX && y === cellY) continue
        if (!this.isInside(x, y)) continue
        const cell = terrain[x]?.[y] ?? 'shortGrass'
        if (cell !== 'water' && cell !== 'deepWater' && cell !== 'shallowWater') return true
      }
    }
    return false
  }

  private createTerrainMap() {
    const terrain = Array.from({ length: this.cols }, () => Array<TerrainType>(this.rows).fill('shortGrass'))

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        terrain[x][y] = this.terrainForCell(x, y)
      }
    }

    const softened = terrain.map((col) => [...col])
    for (let x = 1; x < this.cols - 1; x++) {
      for (let y = 1; y < this.rows - 1; y++) {
        const cell = terrain[x][y]
        const nearWater = this.hasNearbyTerrain(terrain, x, y, ['water', 'deepWater'], 1)
        const nearLand = this.hasNearbyLand(terrain, x, y, 1)
        if ((cell === 'water' || cell === 'deepWater') && nearLand) softened[x][y] = 'shallowWater'
        if (cell !== 'water' && cell !== 'deepWater' && cell !== 'shallowWater' && cell !== 'mountain' && nearWater) {
          softened[x][y] = this.roadStrengthAt(x, y) > 0.3 ? 'dirt' : 'sand'
        }
      }
    }

    return softened
  }

  private countWalls(map: number[][], cellX: number, cellY: number) {
    let count = 0
    for (let x = cellX - 1; x <= cellX + 1; x++) {
      for (let y = cellY - 1; y <= cellY + 1; y++) {
        if (x === cellX && y === cellY) continue
        if (!this.isInside(x, y) || map[x][y] === 1) count++
      }
    }
    return count
  }

  private clearSafeZone(centerX: number, centerY: number, radius: number) {
    for (let x = centerX - radius; x <= centerX + radius; x++) {
      for (let y = centerY - radius; y <= centerY + radius; y++) {
        if (this.isInside(x, y)) {
          this.map[x][y] = 0
          if (this.heightMap[x]) this.heightMap[x][y] = Math.min(this.heightMap[x][y], 0.42)
          if (this.terrainMap[x]) {
            const distance = Math.hypot(x - centerX, y - centerY)
            this.terrainMap[x][y] = distance < radius * 0.55 ? 'dirt' : 'shortGrass'
          }
        }
      }
    }
  }

  private createResourceNodes() {
    const candidates = [
      { x: Math.floor(this.cols * 0.28), y: Math.floor(this.rows * 0.3) },
      { x: Math.floor(this.cols * 0.42), y: Math.floor(this.rows * 0.72) },
      { x: Math.floor(this.cols * 0.52), y: Math.floor(this.rows * 0.44) },
      { x: Math.floor(this.cols * 0.62), y: Math.floor(this.rows * 0.22) },
      { x: Math.floor(this.cols * 0.77), y: Math.floor(this.rows * 0.68) },
    ]

    this.resourceNodes = candidates.map((candidate, index) => {
      const cell = this.findClosestWalkable(candidate) ?? candidate
      this.clearSafeZone(cell.x, cell.y, 2)
      this.clearCorridor(this.playerBase, cell, 1)
      this.clearCorridor(this.enemyBase, cell, 1)
      return {
        id: index + 1,
        x: cell.x * GRID_SIZE + GRID_SIZE / 2,
        y: cell.y * GRID_SIZE + GRID_SIZE / 2,
        amount: 900,
      }
    })
  }

  private clearCorridor(from: GridPoint, to: GridPoint, radius: number) {
    const steps = Math.max(Math.abs(to.x - from.x), Math.abs(to.y - from.y))
    for (let i = 0; i <= steps; i++) {
      const t = steps === 0 ? 0 : i / steps
      const cx = Math.round(from.x + (to.x - from.x) * t)
      const cy = Math.round(from.y + (to.y - from.y) * t)
      for (let x = cx - radius; x <= cx + radius; x++) {
        for (let y = cy - radius; y <= cy + radius; y++) {
          if (!this.isInside(x, y)) continue
          this.map[x][y] = 0
          this.heightMap[x][y] = Math.min(this.heightMap[x][y], 0.46)
          const distance = Math.hypot(x - cx, y - cy)
          this.terrainMap[x][y] = distance <= Math.max(0.5, radius * 0.55) ? 'dirt' : 'sand'
        }
      }
    }
  }

  private resetUnits() {
    this.unitLayer.removeChildren()
    this.wreckLayer.removeChildren()
    this.units = []
    this.spawnArmy('player', this.startingUnitCount('player'))
    this.spawnArmy('enemy', this.startingUnitCount('enemy'))
  }

	  private resetStructures() {
	    this.structureLayer.removeChildren()
	    this.structures = []
	  }

  private createStructure(team: Team, cell: GridPoint, kind: StructureKind): StructureState {
    const view = new Graphics()
    const hpBar = new Graphics()
    const flash = new Graphics()
    const config = this.structureIniConfigs[kind]
    const core = config?.core ?? {}
    const attack = config?.attack ?? {}
    const projectile = config ? this.primaryProjectile(config) : {}
    const configuredHp = this.iniNumber(core.maxhp)
    const configuredRange = this.iniNumber(attack.maxattackrange)
    const configuredDelay = this.iniNumber(attack.shootdelay)
    const configuredDamage = this.iniProjectileDamage(projectile)
	    const hp = configuredHp
	      ? this.normalizeStructureHp(configuredHp)
	      : kind === 'factory' ? 420 : kind === 'airfield' ? 360 : kind === 'repair' ? 300 : kind === 'extractor' ? 220 : kind === 'radar' ? 180 : 260
    const structure = {
      id: this.structures.length + 1,
      team,
      kind,
      x: cell.x * GRID_SIZE + GRID_SIZE / 2,
      y: cell.y * GRID_SIZE + GRID_SIZE / 2,
      hp,
      maxHp: hp,
	      range: configuredRange ?? (kind === 'radar' ? 390 : kind === 'repair' ? 150 : kind === 'factory' || kind === 'airfield' ? 0 : 210),
	      damage: kind === 'turret' ? configuredDamage ?? 18 : 0,
	      cooldown: configuredDelay ?? (kind === 'factory' ? 420 : kind === 'airfield' ? 460 : kind === 'repair' ? 36 : kind === 'radar' ? 90 : 42),
      attackCooldown: 18,
      canAttackFlying: attack.canattackflyingunits === undefined ? undefined : this.iniBoolean(attack.canattackflyingunits),
      canAttackLand: attack.canattacklandunits === undefined ? undefined : this.iniBoolean(attack.canattacklandunits),
      view,
      sprites: [],
      hpBar,
      flash,
      dead: false,
    }

    this.addStructureSprites(structure)
    view.addChild(hpBar as any, flash as any)
    this.structureLayer.addChild(view as any)
    this.renderStructure(structure)
    return structure
  }

  private addStructureSprites(structure: StructureState) {
    const config = STRUCTURE_TEXTURES[structure.kind]
    const tint = structure.team === 'player' ? 0xe3fff0 : 0xffd7d7

    if (config.back) {
      const back = new Sprite(config.back)
      back.anchor.set(0.5)
      back.width = config.backWidth ?? config.width
      back.height = config.backHeight ?? config.height
      back.tint = tint
      structure.sprites.push(back)
      structure.view.addChild(back as any)
    }

    const body = new Sprite(config.body)
    body.anchor.set(0.5)
    body.width = config.width
    body.height = config.height
    body.tint = tint
    structure.sprites.push(body)
    structure.view.addChild(body as any)

    if (config.door) {
      const door = new Sprite(config.door)
      door.anchor.set(0.5)
      door.width = config.width * 0.42
      door.height = config.height * 0.22
      door.y = config.height * 0.08
      door.tint = tint
      structure.doorSprite = door
      structure.sprites.push(door)
      structure.view.addChild(door as any)
    }

    if (config.turret) {
      const turret = new Sprite(config.turret)
      turret.anchor.set(0.5)
      turret.width = config.turretWidth ?? config.width * 0.5
      turret.height = config.turretHeight ?? config.height * 0.95
      turret.x = config.turretOffsetX ?? 0
      turret.y = config.turretOffsetY ?? 0
      turret.tint = tint
      structure.turretSprite = turret
      structure.sprites.push(turret)
      structure.view.addChild(turret as any)
    }
  }

	  private spawnArmy(team: Team, count: number) {
	    const roster: UnitRole[] = [
	      'engineer',
	      'tank',
	      'scout',
	      'tank',
	      'engineer',
	      'scout',
	    ]

    for (let i = 0; i < count; i++) {
      const role = roster[i % roster.length]
      const def = this.unitDefs[role]
      const start = this.findSpawnCell(team, i, def)
      this.units.push(this.createUnit(team, def, start, i))
    }
  }

  private createUnit(team: Team, def: UnitDef, start: GridPoint, index: number): RtsUnit {
    const container = new Container()
    const frameTextures = this.createFrameTextures(def)
    const sprite = new Sprite(frameTextures[0])
    const rotor = def.rotorTexture ? new Sprite(def.rotorTexture) : undefined
    const turret = def.turretTexture ? new Sprite(def.turretTexture) : undefined
    const turretParts = (def.turretParts ?? []).map((part) => new Sprite(part.texture))
    const hpBar = new Graphics()
    const flash = new Graphics()
    const teamTint = team === 'player' ? 0xdfffea : 0xffd6d6

    sprite.anchor.set(0.5)
    sprite.width = def.width
    sprite.height = def.height
    sprite.tint = teamTint
    container.addChild(sprite as any)
    if (turret) {
      turret.anchor.set(0.5, def.turretAnchorY ?? ((def.turretHeight ?? 0) > (def.turretWidth ?? def.width) * 1.45 ? 0.62 : 0.5))
      turret.width = def.turretWidth ?? def.width * 0.55
      turret.height = def.turretHeight ?? def.height * 1.2
      turret.x = def.turretOffsetX ?? 0
      turret.y = def.turretOffsetY ?? -4
      turret.tint = teamTint
      container.addChild(turret as any)
    }
    for (const [partIndex, part] of (def.turretParts ?? []).entries()) {
      const partSprite = turretParts[partIndex]
      partSprite.anchor.set(0.5, part.anchorY ?? 0.5)
      partSprite.width = part.width ?? def.turretWidth ?? def.width * 0.55
      partSprite.height = part.height ?? def.turretHeight ?? def.height * 1.2
      partSprite.x = part.x
      partSprite.y = part.y
      partSprite.tint = teamTint
      container.addChild(partSprite as any)
    }
    if (rotor) {
      rotor.anchor.set(0.5)
      rotor.width = def.rotorWidth ?? def.width * 1.5
      rotor.height = def.rotorHeight ?? def.height * 0.45
      rotor.tint = teamTint
      container.addChild(rotor as any)
    }
    container.addChild(hpBar as any, flash as any)
    this.unitLayer.addChild(container as any)

    const unit = {
      id: this.units.length + 1,
      team,
      def,
      x: start.x * GRID_SIZE + GRID_SIZE / 2,
      y: start.y * GRID_SIZE + GRID_SIZE / 2,
      hp: def.hp,
      maxHp: def.hp,
      speed: def.speed,
      currentSpeed: 0,
      path: [],
      pathIndex: 0,
      container,
      sprite,
      desiredRotation: 0,
      frameTextures,
      animationClock: 0,
      rotor,
      turret,
      turretParts,
      turretRotation: 0,
      hpBar,
      flash,
      aiCooldown: index * 4,
      attackCooldown: 20 + (index % 7) * 4,
      commandUntil: 0,
      dead: false,
    }

    this.renderUnit(unit, 0)
    return unit
  }

  private createUnitFromBase(base: BaseState, role: UnitRole, index: number) {
    const door = this.findClosestWalkable({ x: base.x, y: base.y + 3 }, this.unitDefs[role]) ?? this.findSpawnCell(base.team, index, this.unitDefs[role])
    const exit = this.findClosestWalkable({ x: door.x, y: door.y + 3 }, this.unitDefs[role]) ?? door
    const unit = this.createUnit(base.team, this.unitDefs[role], door, index)
    this.setProductionExitPath(unit, exit)
    return unit
  }

  private createUnitFromFactory(structure: StructureState, role: UnitRole, index: number) {
    const door = this.findClosestWalkable(this.pixelToCell(structure.x, structure.y + 28), this.unitDefs[role]) ?? this.pixelToCell(structure.x, structure.y)
    const exit = this.findClosestWalkable(this.pixelToCell(structure.x, structure.y + 70), this.unitDefs[role]) ?? door
    const unit = this.createUnit(structure.team, this.unitDefs[role], door, index)
    this.setProductionExitPath(unit, exit)
    return unit
  }

	  private setProductionExitPath(unit: RtsUnit, exit: GridPoint) {
	    this.rebuildPathReservations(unit)
	    unit.path = this.findPath(this.pixelToCell(unit.x, unit.y), exit, unit)
	    unit.pathIndex = 0
	    this.reserveUnitPath(unit)
	    unit.commandUntil = 46
	    unit.aiCooldown = 24
	  }

  private createFrameTextures(def: UnitDef) {
    if (def.frames) return def.frames

    def.frames = Array.from({ length: def.frameCount }, (_, index) => new Texture(
      def.texture.baseTexture,
      new Rectangle(index * def.frameWidth, 0, def.frameWidth, def.frameHeight),
    ))
    return def.frames
  }

  private findSpawnCell(team: Team, index: number, def: UnitDef) {
    const base = team === 'player' ? this.playerBase : this.enemyBase
    const direction = team === 'player' ? 1 : -1

    for (let attempt = 0; attempt < 180; attempt++) {
      const x = base.x + direction * (3 + Math.floor(this.random() * 12)) + Math.floor((this.random() - 0.5) * 7)
      const y = base.y + Math.floor((this.random() - 0.5) * 22)
      if (this.isCellPassable(x, y, def)) return { x, y }
    }

    return {
      x: Math.max(2, Math.min(this.cols - 3, base.x + direction * (4 + (index % 6)))),
      y: Math.max(2, Math.min(this.rows - 3, base.y - 6 + Math.floor(index / 6))),
    }
  }

  private update = (delta: number) => {
    const scaledDelta = this.isPaused ? 0 : delta * this.simulationSpeed
    let playerAlive = 0
    let enemyAlive = 0
    this.frameCount++
    this.mapRefreshTimer -= delta
    this.uiRefreshTimer -= delta
    this.minimapRefreshTimer -= delta

    if (scaledDelta > 0) this.buildUnitSpatialHash()

    for (const unit of this.units) {
      if (unit.dead) {
        continue
      }

      if (unit.team === 'player') playerAlive++
      else enemyAlive++

      unit.aiCooldown -= scaledDelta
      unit.attackCooldown -= scaledDelta
      unit.commandUntil = Math.max(0, unit.commandUntil - scaledDelta)

      this.updateUnitTactics(unit, scaledDelta)
      this.moveUnit(unit, scaledDelta)
    }

	    if (scaledDelta > 0) {
	      this.buildUnitSpatialHash()
	      this.resolveUnitCollisions(scaledDelta)
	      this.buildUnitSpatialHash()
	    }

    for (const unit of this.units) {
      if (!unit.dead) this.renderUnit(unit, scaledDelta)
    }

    this.updateStructures(scaledDelta)
    this.updateBaseProduction(scaledDelta)
    this.updateProjectiles(scaledDelta)
    this.updateExplosions(scaledDelta)
    this.updateBeams(scaledDelta)
    this.updateEconomy(scaledDelta)
    this.updateEngineerWork(scaledDelta)
    if (scaledDelta > 0 && this.mapRefreshTimer <= 0) {
      this.drawMap()
      this.mapRefreshTimer = this.units.length > 300 ? 12 : 5
    }

    if (this.enemyBase.hp <= 0 || enemyAlive === 0) {
      this.battleState = 'playerWon'
    } else if (this.playerBase.hp <= 0 || playerAlive === 0) {
      this.battleState = 'enemyWon'
    }

    if (this.battleState !== 'running') {
      this.lastWinner = this.battleState === 'playerWon' ? '我方胜利' : '敌方胜利'
      this.generation++
      this.playerBase.hp = this.playerBase.maxHp
      this.enemyBase.hp = this.enemyBase.maxHp
      this.playerBase.production = undefined
      this.enemyBase.production = undefined
      this.resetUnits()
      this.resetStructures()
      this.projectiles = []
      this.explosions = []
      this.beams = []
      this.effectLayer.removeChildren()
	      this.playerResources = 620
	      this.enemyResources = 620
	      this.frameCount = 0
	      this.reinforceTimer = 1800
      this.drawOverlay()
      this.drawPath()
      this.battleState = 'running'
    }

    if (this.selectedUnits.length > 0 || this.dragState?.moved) {
      this.drawOverlay()
      this.drawPath()
    }
    if (this.uiRefreshTimer <= 0) {
      this.drawUi()
      this.uiRefreshTimer = this.units.length > 300 ? 10 : 4
    }
    if (this.minimapRefreshTimer <= 0) {
      this.drawMinimap()
      this.minimapRefreshTimer = this.units.length > 300 ? 16 : 6
    }
  }

  private updateEconomy(delta: number) {
    if (delta <= 0) return

    this.playerResources += 0.035 * delta
    this.enemyResources += 0.04 * delta
    this.updateResourceControl(delta)
    this.updateStrategicAi(delta)
    this.reinforceTimer -= delta

    if (this.reinforceTimer > 0) return

    this.spawnReinforcements('player')
    this.spawnReinforcements('enemy')
	    this.reinforceTimer = 1500
  }

  private spawnReinforcements(team: Team) {
	    const alive = this.units.filter((unit) => unit.team === team && !unit.dead).length
	    const cap = this.unitCap(team, team === 'player' ? 10 : 12)
	    const resources = team === 'player' ? this.playerResources : this.enemyResources
	    const reserve = this.economyBuildReserve(team)
	    if (alive >= cap || resources - reserve < 80) return

	    const nextRoles: UnitRole[] = ['scout', 'tank']
    const role = nextRoles[Math.floor(this.random() * nextRoles.length)]
    const cost = this.unitCost(role)

    if (team === 'player') this.playerResources -= cost
    else this.enemyResources -= cost

    const unit = this.createUnit(team, this.unitDefs[role], this.findSpawnCell(team, alive, this.unitDefs[role]), alive)
    this.units.push(unit)
	    this.spawnExplosion(unit.x, unit.y, team === 'player' ? 0x67e8a5 : 0xff6b6b)
	  }
	
	  private economyBuildReserve(team: Team) {
	    let reserve = 0
	    const hasExtractor = this.completedTeamStructures(team, 'extractor').length > 0
	    const openResourceSlot = this.resourceNodes.some((node) => node.amount > 0 && !this.resourceHasExtractor(node))
	    if (!hasExtractor && openResourceSlot) reserve += this.structureCost('extractor')
	    if (this.teamStructures(team, 'factory').length === 0) reserve += this.structureCost('factory')
	    return reserve
	  }

  private updateBaseProduction(delta: number) {
    if (delta <= 0) return
    this.advanceBaseProduction(this.playerBase, delta)
    this.advanceBaseProduction(this.enemyBase, delta)
  }

  private advanceBaseProduction(base: BaseState, delta: number) {
    if (!base.production) return

    base.production.progress = Math.min(base.production.duration, base.production.progress + delta)
    if (base.production.progress < base.production.duration) return

    const alive = this.units.filter((unit) => unit.team === base.team && !unit.dead).length
    const cap = this.unitCap(base.team, 20)
    if (alive >= cap) return

    const role = base.production.role
    const unit = this.createUnitFromBase(base, role, alive)
    this.units.push(unit)
    this.spawnExplosion(unit.x, unit.y, base.team === 'player' ? 0x67e8a5 : 0xff6b6b)
    base.production = undefined
  }

  private ensureEnemyBuilderProduction() {
    this.ensureBaseBuilderProduction('enemy', this.aiIntent.enemy)
  }

  private updateStrategicAi(delta: number) {
    this.aiDecisionTimer -= delta
    if (this.aiDecisionTimer > 0) return

    this.aiIntent.player = this.evaluateStrategicIntent('player')
    this.aiIntent.enemy = this.evaluateStrategicIntent('enemy')
    this.executeStrategicIntent('player')
    this.executeStrategicIntent('enemy')
    this.aiDecisionTimer = 96
  }

  private evaluateStrategicIntent(team: Team): AiIntent {
    const genomes = this.strategicAi?.get_genomes() ?? []
    const genome = genomes[this.aiGenomeIndex % Math.max(1, genomes.length)]
    this.aiGenomeIndex++
    const outputs = genome?.forward(this.strategicInputs(team)) ?? []
    const shaped = (index: number, fallback: number) => {
      const raw = Number(outputs[index])
      if (!Number.isFinite(raw)) return fallback
      return Math.max(0.05, Math.min(0.95, (raw + 1) * 0.5))
    }
    const current = this.aiIntent[team]
    const resources = this.resourcesFor(team)
    const builders = this.teamBuilders(team).length
    const factories = this.teamStructures(team, 'factory').length
    const extractors = this.teamStructures(team, 'extractor').length
    const base = team === 'player' ? this.playerBase : this.enemyBase

    const intent = {
      economy: Math.max(shaped(0, current.economy), builders < 2 ? 0.86 : 0, extractors < 2 ? 0.72 : 0),
      production: Math.max(shaped(1, current.production), factories < 1 ? 0.68 : 0),
      defense: Math.max(shaped(2, current.defense), base.hp / base.maxHp < 0.65 ? 0.86 : 0),
      attack: shaped(3, current.attack),
      air: shaped(4, current.air),
      tech: Math.max(shaped(5, current.tech), resources > 230 ? 0.58 : 0),
      lastAction: current.lastAction,
    }

    return intent
  }

  private strategicInputs(team: Team) {
    const enemy: Team = team === 'player' ? 'enemy' : 'player'
    const base = team === 'player' ? this.playerBase : this.enemyBase
    const enemyBase = team === 'player' ? this.enemyBase : this.playerBase
    const alive = this.units.filter((unit) => unit.team === team && !unit.dead).length
    const enemyAlive = this.units.filter((unit) => unit.team === enemy && !unit.dead).length
    const enemyNearBase = this.units.filter((unit) => (
      !unit.dead &&
      unit.team === enemy &&
      Math.hypot(unit.x - this.targetX(base), unit.y - this.targetY(base)) < 260
    )).length

    return [
      Math.min(1, this.resourcesFor(team) / 420),
      alive / Math.max(1, this.unitCap(team, 20)),
      enemyAlive / Math.max(1, this.unitCap(enemy, 20)),
      base.hp / base.maxHp,
      enemyBase.hp / enemyBase.maxHp,
      this.resourceNodes.filter((node) => node.controller === team).length / Math.max(1, this.resourceNodes.length),
      this.teamStructures(team, 'factory').length / 3,
      Math.min(1, enemyNearBase / 8),
    ]
  }

	  private executeStrategicIntent(team: Team) {
	    const intent = this.aiIntent[team]
	    this.commandEngineers(team, intent)
	    this.ensureBaseBuilderProduction(team, intent)
	    this.commandCombatGroups(team, intent)
	  }

	  private ensureBaseBuilderProduction(team: Team, intent: AiIntent) {
	    const base = team === 'player' ? this.playerBase : this.enemyBase
	    const builders = this.teamBuilders(team).length
	    if (builders === 0 && base.production && base.production.role !== 'engineer') {
	      base.production = undefined
	    }
	    if (base.production || this.resourcesFor(team) < this.unitCost('engineer')) return
	    const reserve = this.economyBuildReserve(team)
	    if (builders > 0 && this.resourcesFor(team) - reserve < Math.min(this.unitCost('engineer'), this.unitCost('tank'))) return
	    const desiredBuilders = intent.economy > 0.68 ? 4 : 3
	    if (builders < desiredBuilders) {
	      if (this.queueBaseProduction(team, 'engineer')) intent.lastAction = '基地生产工程师'
	      return
	    }
	
	    const alive = this.units.filter((unit) => unit.team === team && !unit.dead).length
	    const tanks = this.units.filter((unit) => !unit.dead && unit.team === team && unit.def.role === 'tank').length
	    if (alive < this.unitCap(team, 8) && tanks < 4 && this.resourcesFor(team) - reserve >= this.unitCost('tank')) {
	      if (this.queueBaseProduction(team, 'tank')) intent.lastAction = '基地生产小坦克'
	    }
	  }

  private commandEngineers(team: Team, intent: AiIntent) {
    const builders = this.teamBuilders(team)
    if (builders.length === 0) return

	    const extractorCount = this.completedTeamStructures(team, 'extractor').length
	    const extractorTotal = this.teamStructures(team, 'extractor').length
	    const extractorSlotsTaken = this.resourceNodes.filter((node) => this.resourceHasExtractor(node)).length
	    const factoryCount = this.completedTeamStructures(team, 'factory').length
	    const factoryTotal = this.teamStructures(team, 'factory').length
	    const airfieldTotal = this.teamStructures(team, 'airfield').length
	    const turretCount = this.teamStructures(team, 'turret').length
	    const repairCount = this.teamStructures(team, 'repair').length
	    const radarCount = this.teamStructures(team, 'radar').length
	    const unprotectedExtractor = this.unprotectedResourceNode(team)
	    const repairlessExtractor = this.resourceNodeNeedingSupport(team, 'repair', 190)
	    const damagedUnits = this.units.some((unit) => !unit.dead && unit.team === team && unit.hp < unit.maxHp * 0.55)
	
	    const plan: StructureKind[] = []
	    const desiredExtractors = Math.min(this.resourceNodes.length, factoryTotal < 1 ? 2 : 4)
	    if (intent.economy > 0.45 && extractorTotal < desiredExtractors && extractorSlotsTaken < this.resourceNodes.length) plan.push('extractor')
	    if (unprotectedExtractor && turretCount < extractorCount + 2) plan.push('turret')
	    if ((repairlessExtractor || damagedUnits) && repairCount < Math.max(1, Math.min(3, extractorCount))) plan.push('repair')
	    if (factoryCount < 1 && factoryTotal < 1 && extractorCount >= 1 && this.resourcesFor(team) >= this.structureCost('factory') * 0.8) plan.push('factory')
	    if (intent.production > 0.52 && factoryTotal < 2) plan.push('factory')
	    if (intent.air > 0.55 && factoryCount > 0 && airfieldTotal < 1) plan.push('airfield')
	    if ((intent.defense > 0.58 || damagedUnits) && repairCount < 2) plan.push('repair')
    if (intent.defense > 0.48 && turretCount < Math.max(4, extractorCount + 1)) plan.push('turret')
    if (intent.tech > 0.55 && radarCount < 1) plan.push('radar')

    for (const kind of plan) {
      const builder = this.bestBuilderForPlan(builders)
      if (!builder) return
      if (this.assignBuilderConstruction(team, builder, kind)) {
	        intent.lastAction = `工程师修建${this.structureLabel(kind)}`
	        return
	      }
	    }
	
	    if (intent.economy > 0.55) {
	      const builder = this.bestBuilderForPlan(builders)
	      const target = builder ? this.pickUnclaimedResourceTarget(builder) : undefined
	      if (builder && target) {
	        this.commandUnitToCell(builder, target, 150)
	        intent.lastAction = '工程师前往资源点等待建造'
	      }
	    }
	  }

	  private bestBuilderForPlan(builders: RtsUnit[]) {
	    return builders
	      .filter((builder) => builder.hp > builder.maxHp * 0.25 && !this.isBuilderConstructing(builder))
	      .sort((a, b) => a.commandUntil - b.commandUntil)[0]
	  }

  private assignBuilderConstruction(team: Team, builder: RtsUnit, kind: StructureKind) {
    if (this.resourcesFor(team) < this.structureCost(kind)) return false
    const cell = this.findAiBuildCell(team, builder, kind)
    if (!cell) return false

	    return this.buildStructureForTeam(team, builder, cell, kind, true)
	  }

  private findAiBuildCell(team: Team, builder: RtsUnit, kind: StructureKind) {
    if (kind === 'extractor') {
	      const node = this.resourceNodes
	        .filter((resource) => resource.amount > 0)
	        .filter((resource) => !this.resourceHasExtractor(resource))
	        .sort((a, b) => this.resourceExpansionScore(team, builder, a) - this.resourceExpansionScore(team, builder, b))[0]
      if (!node) return undefined
      return this.findOpenBuildCellAround(this.pixelToCell(node.x, node.y), kind)
    }

    const base = team === 'player' ? this.playerBase : this.enemyBase
    const forward = team === 'player' ? 1 : -1
    const resourceAnchor = this.resourceSupportAnchor(team, kind)
    const anchor = resourceAnchor ?? {
      x: base.x + forward * (kind === 'turret' ? 6 : kind === 'factory' ? 7 : kind === 'airfield' ? 9 : 4),
      y: base.y + (kind === 'repair' ? 5 : kind === 'radar' ? -6 : kind === 'airfield' ? -5 : 0),
    }
    return this.findOpenBuildCellAround(anchor, kind)
  }

  private resourceExpansionScore(team: Team, builder: RtsUnit, node: ResourceNode) {
    const base = team === 'player' ? this.playerBase : this.enemyBase
    const distanceToBuilder = Math.hypot(node.x - builder.x, node.y - builder.y) / GRID_SIZE
    const distanceFromBase = Math.hypot(node.x - this.targetX(base), node.y - this.targetY(base)) / GRID_SIZE
    const ownExtractors = this.completedTeamStructures(team, 'extractor').length
    const expansionBonus = ownExtractors < 2 ? -distanceFromBase * 0.42 : -distanceFromBase * 0.12
    const frontlineBias = team === 'player' ? -node.x / GRID_SIZE * 0.08 : node.x / GRID_SIZE * 0.08
    return distanceToBuilder + expansionBonus + frontlineBias
  }

  private resourceSupportAnchor(team: Team, kind: StructureKind) {
    const preferred = kind === 'turret'
      ? this.unprotectedResourceNode(team)
      : kind === 'repair'
        ? this.resourceNodeNeedingSupport(team, 'repair', 190)
        : this.frontlineResourceNode(team)
    if (!preferred) return undefined

    const cell = this.pixelToCell(preferred.x, preferred.y)
    const side = team === 'player' ? -1 : 1
    if (kind === 'turret') return { x: cell.x + side * 2, y: cell.y + 1 }
    if (kind === 'repair') return { x: cell.x + side * 3, y: cell.y + 3 }
    if (kind === 'radar') return { x: cell.x + side * 2, y: cell.y - 4 }
    if (kind === 'factory') return { x: cell.x + side * 5, y: cell.y + 5 }
    if (kind === 'airfield') return { x: cell.x + side * 7, y: cell.y - 5 }
    return cell
  }

  private frontlineResourceNode(team: Team) {
    const base = team === 'player' ? this.playerBase : this.enemyBase
    return this.resourceNodes
      .filter((node) => this.resourceCompletedExtractor(node)?.team === team)
      .sort((a, b) => (
        Math.hypot(b.x - this.targetX(base), b.y - this.targetY(base)) -
        Math.hypot(a.x - this.targetX(base), a.y - this.targetY(base))
      ))[0]
  }

  private unprotectedResourceNode(team: Team) {
    return this.resourceNodeNeedingSupport(team, 'turret', 210)
  }

  private resourceNodeNeedingSupport(team: Team, kind: StructureKind, radius: number) {
    const base = team === 'player' ? this.playerBase : this.enemyBase
    return this.resourceNodes
      .filter((node) => this.resourceCompletedExtractor(node)?.team === team)
      .filter((node) => !this.teamStructureNear(node, team, kind, radius))
      .sort((a, b) => (
        Math.hypot(b.x - this.targetX(base), b.y - this.targetY(base)) -
        Math.hypot(a.x - this.targetX(base), a.y - this.targetY(base))
      ))[0]
  }

  private teamStructureNear(node: ResourceNode, team: Team, kind: StructureKind, radius: number) {
    return this.structures.some((structure) => (
      !structure.dead &&
      structure.team === team &&
      structure.kind === kind &&
      Math.hypot(structure.x - node.x, structure.y - node.y) < radius
    ))
  }

  private findOpenBuildCellAround(anchor: GridPoint, kind: StructureKind) {
    for (let radius = 0; radius <= 8; radius++) {
      for (let x = anchor.x - radius; x <= anchor.x + radius; x++) {
        for (let y = anchor.y - radius; y <= anchor.y + radius; y++) {
          const cell = { x, y }
          if (this.isBuildCellOpen(cell, kind)) return cell
        }
      }
    }
    return undefined
  }

	  private commandCombatGroups(team: Team, intent: AiIntent) {
	    if (intent.attack < 0.58 && intent.defense < 0.62) return
	    const base = team === 'player' ? this.playerBase : this.enemyBase
	    const enemy: Team = team === 'player' ? 'enemy' : 'player'
	    const enemyNearBase = this.units.some((unit) => (
	      !unit.dead &&
	      unit.team === enemy &&
	      Math.hypot(unit.x - this.targetX(base), unit.y - this.targetY(base)) < 310
	    ))
	    if (this.frameCount < 3200 && !enemyNearBase) return
	    const combatUnits = this.units.filter((unit) => (
	      !unit.dead &&
	      unit.team === team &&
      !unit.def.builder &&
      unit.commandUntil <= 0 &&
      unit.pathIndex >= unit.path.length
	    ))
	    if (combatUnits.length < 4) return
	
	    const enemyBase = team === 'player' ? this.enemyBase : this.playerBase
    const defendCell = { x: base.x + (team === 'player' ? 5 : -5), y: base.y }
    const attackTarget = this.pickStrategicAttackCell(team) ?? { x: enemyBase.x, y: enemyBase.y }
    const goal = intent.defense > intent.attack + 0.18 ? defendCell : attackTarget

    for (const [index, unit] of combatUnits.slice(0, 12).entries()) {
      const offset = {
        x: goal.x + (index % 4) - 1,
        y: goal.y + Math.floor(index / 4) - 1,
      }
      const cell = this.findClosestWalkable(offset, unit)
      if (cell) this.commandUnitToCell(unit, cell, 170)
    }
    intent.lastAction = intent.defense > intent.attack + 0.18 ? '部队回防基地' : '部队推进攻击'
  }

  private pickStrategicAttackCell(team: Team) {
    const enemy: Team = team === 'player' ? 'enemy' : 'player'
    const target = this.structures
      .filter((structure) => !structure.dead && structure.team === enemy)
      .sort((a, b) => {
	        const weight = (kind: StructureKind) => kind === 'extractor' ? 0 : kind === 'factory' ? 1 : kind === 'airfield' ? 2 : kind === 'turret' ? 3 : 4
        return weight(a.kind) - weight(b.kind)
      })[0]
    return target ? this.pixelToCell(target.x, target.y) : undefined
  }

	  private commandUnitToCell(unit: RtsUnit, cell: GridPoint, commandUntil = 120) {
	    const target = this.findClosestWalkable(cell, unit)
	    if (!target) return
	    this.rebuildPathReservations(unit)
	    unit.path = this.findPath(this.pixelToCell(unit.x, unit.y), target, unit)
	    unit.pathIndex = 0
	    this.reserveUnitPath(unit)
	    unit.aiCooldown = commandUntil
	    unit.commandUntil = commandUntil
	    unit.target = undefined
	  }

  private teamBuilders(team: Team) {
    return this.units.filter((unit) => !unit.dead && unit.team === team && unit.def.builder)
  }

	  private teamStructures(team: Team, kind: StructureKind) {
	    return this.structures.filter((structure) => !structure.dead && structure.team === team && structure.kind === kind)
	  }
	
	  private completedTeamStructures(team: Team, kind: StructureKind) {
	    return this.structures.filter((structure) => (
	      !structure.dead &&
	      !structure.construction &&
	      structure.team === team &&
	      structure.kind === kind
	    ))
	  }
	
	  private resourceHasExtractor(node: ResourceNode) {
	    return this.structures.some((structure) => (
	      !structure.dead &&
	      structure.kind === 'extractor' &&
	      Math.hypot(structure.x - node.x, structure.y - node.y) < 130
	    ))
	  }
	
	  private resourceCompletedExtractor(node: ResourceNode) {
	    return this.structures
	      .filter((structure) => (
	        !structure.dead &&
	        !structure.construction &&
	        structure.kind === 'extractor' &&
	        Math.hypot(structure.x - node.x, structure.y - node.y) < 130
	      ))
	      .sort((a, b) => Math.hypot(a.x - node.x, a.y - node.y) - Math.hypot(b.x - node.x, b.y - node.y))[0]
	  }

  private structureLabel(kind: StructureKind) {
    if (kind === 'extractor') return '采集器'
	    if (kind === 'factory') return '工厂'
	    if (kind === 'airfield') return '空军基地'
    if (kind === 'repair') return '维修站'
    if (kind === 'radar') return '雷达'
    return '炮塔'
  }

	  private maybeRetreatForRepair(unit: RtsUnit) {
	    if (unit.def.builder || unit.hp > unit.maxHp * 0.28) return false
	    if (unit.commandUntil > 0 && unit.team === 'player') return false

    const repair = this.teamStructures(unit.team, 'repair')
      .sort((a, b) => Math.hypot(a.x - unit.x, a.y - unit.y) - Math.hypot(b.x - unit.x, b.y - unit.y))[0]
    if (!repair) return false

    const distance = Math.hypot(repair.x - unit.x, repair.y - unit.y)
    if (distance <= repair.range * 0.55) {
      unit.path = []
      unit.pathIndex = 0
      unit.target = undefined
      unit.aiCooldown = 36
      return true
    }

    if (unit.aiCooldown <= 0 || unit.pathIndex >= unit.path.length) {
      this.commandUnitToCell(unit, this.pixelToCell(repair.x, repair.y), 120)
      unit.aiCooldown = 42
	    }
	    return true
	  }
	
	  private maybeRetreatBuilder(unit: RtsUnit) {
	    if (!unit.def.builder || unit.dead) return false
	    const construction = this.builderConstruction(unit)
	    const healthRatio = unit.hp / Math.max(1, unit.maxHp)
	    const threatRange = healthRatio < 0.45 ? 300 : healthRatio < 0.72 ? 210 : 135
	    const threat = this.findNearestEnemyForPoint(
	      unit.team,
	      unit.x,
	      unit.y,
	      threatRange,
	      (candidate) => this.canTargetThreatenUnit(candidate, unit),
	    )
	    if (!threat && healthRatio > 0.45) return false
	
	    const threatDistance = threat
	      ? Math.hypot(this.targetX(threat) - unit.x, this.targetY(threat) - unit.y)
	      : Infinity
	    if (construction) {
	      const holdDistance = construction.kind === 'extractor' ? 70 : 105
	      const holdHealth = construction.kind === 'extractor' ? 0.38 : 0.46
	      if (healthRatio > holdHealth && threatDistance > holdDistance) return false
	    } else if (healthRatio > 0.72 && threatDistance > 95) {
	      return false
	    } else if (healthRatio > 0.45 && threatDistance > 140) {
	      return false
	    }
	    if (!threat && unit.pathIndex < unit.path.length) return false
	
	    if (unit.aiCooldown > 0 && unit.pathIndex < unit.path.length) return true
	
	    const retreatCell = this.builderRetreatCell(unit, threat)
	    if (!retreatCell) return false
	    this.commandUnitToCell(unit, retreatCell, 150)
	    unit.target = undefined
	    unit.pendingWeapon = undefined
	    unit.aiCooldown = 28
	    return true
	  }
	
	  private builderRetreatCell(unit: RtsUnit, threat?: CombatTarget) {
	    const repair = this.completedTeamStructures(unit.team, 'repair')
	      .sort((a, b) => Math.hypot(a.x - unit.x, a.y - unit.y) - Math.hypot(b.x - unit.x, b.y - unit.y))[0]
	    if (repair) return this.pixelToCell(repair.x, repair.y)
	
	    const base = unit.team === 'player' ? this.playerBase : this.enemyBase
	    if (threat) {
	      const awayX = unit.x - this.targetX(threat)
	      const awayY = unit.y - this.targetY(threat)
	      const length = Math.max(1, Math.hypot(awayX, awayY))
	      const evasive = this.findClosestWalkable(this.pixelToCell(
	        unit.x + (awayX / length) * GRID_SIZE * 7,
	        unit.y + (awayY / length) * GRID_SIZE * 7,
	      ), unit)
	      if (evasive) return evasive
	    }
	
	    const safeSide = unit.team === 'player' ? -1 : 1
	    return this.findClosestWalkable({ x: base.x + safeSide * 4, y: base.y + 4 }, unit)
	      ?? this.findClosestWalkable({ x: base.x, y: base.y + 4 }, unit)
	  }

	  private updateResourceControl(delta: number) {
	    for (const node of this.resourceNodes) {
	      if (node.amount <= 0) continue
	
	      const extractor = this.resourceCompletedExtractor(node)
	      node.controller = extractor?.team
	      if (!extractor) continue
	
	      const mined = Math.min(node.amount, this.resourceHarvestRate(node, extractor.team) * delta)
	      node.amount -= mined
	      this.addResources(extractor.team, mined * 2.05)
	    }
	  }
	
	  private resourceHarvestRate(node: ResourceNode, team: Team) {
	    const extractors = this.structures.filter((structure) => (
	      !structure.dead &&
	      !structure.construction &&
	      structure.team === team &&
	      structure.kind === 'extractor' &&
	      Math.hypot(structure.x - node.x, structure.y - node.y) < 130
	    )).length
	
	    return extractors * this.structureGenerationRate('extractor')
	  }

  private structureGenerationRate(kind: StructureKind) {
    const raw = this.structureIniConfigs[kind]?.core?.generation_resources
    const credits = this.iniNumber(raw)
    if (!credits) return kind === 'extractor' ? 0.13 : 0
    return credits * 0.016
  }

	  private updateEngineerWork(delta: number) {
	    if (delta <= 0) return
	    this.reassignOrphanConstruction()
	
	    for (const builder of this.units) {
	      if (builder.dead || !builder.def.builder) continue

      const construction = this.structures.find((structure) => (
        !structure.dead &&
        structure.team === builder.team &&
        structure.construction?.builderId === builder.id
      ))
      if (construction) {
        this.advanceEngineerConstruction(builder, construction, delta)
        continue
      }

      const repairTarget = this.findEngineerRepairTarget(builder)
      if (repairTarget) {
        this.advanceEngineerRepair(builder, repairTarget, delta)
      }
    }
  }

  private advanceEngineerConstruction(builder: RtsUnit, structure: StructureState, delta: number) {
    if (!structure.construction) return
    const distance = Math.hypot(builder.x - structure.x, builder.y - structure.y)
    if (distance > 96) {
      this.commandUnitToCell(builder, this.pixelToCell(structure.x, structure.y), 90)
      return
    }

    builder.path = []
    builder.pathIndex = 0
    builder.commandUntil = Math.max(builder.commandUntil, 24)
    builder.desiredRotation = Math.atan2(structure.y - builder.y, structure.x - builder.x) + Math.PI / 2
    structure.construction.progress = Math.min(structure.construction.duration, structure.construction.progress + delta)
    const progress = structure.construction.progress / Math.max(1, structure.construction.duration)
    structure.hp = Math.max(structure.hp, structure.maxHp * (0.18 + progress * 0.82))
    this.spawnEngineerWorkEffect(builder, structure.x, structure.y, builder.team === 'player' ? 0x67e8a5 : 0xff8aa1)

    if (structure.construction.progress >= structure.construction.duration) {
      structure.construction = undefined
      structure.hp = structure.maxHp
      this.spawnExplosion(structure.x, structure.y, builder.team === 'player' ? 0x67e8a5 : 0xff6b6b, 22)
    }
  }

  private advanceEngineerRepair(builder: RtsUnit, structure: StructureState, delta: number) {
    const distance = Math.hypot(builder.x - structure.x, builder.y - structure.y)
    if (distance > 92) {
      this.commandUnitToCell(builder, this.pixelToCell(structure.x, structure.y), 90)
      return
    }

    builder.path = []
    builder.pathIndex = 0
    builder.commandUntil = Math.max(builder.commandUntil, 28)
    builder.desiredRotation = Math.atan2(structure.y - builder.y, structure.x - builder.x) + Math.PI / 2
    structure.hp = Math.min(structure.maxHp, structure.hp + 0.55 * delta)
    this.spawnEngineerWorkEffect(builder, structure.x, structure.y, builder.team === 'player' ? 0x8aa1ff : 0xff8aa1)
  }

  private findEngineerRepairTarget(builder: RtsUnit) {
    return this.structures
      .filter((structure) => (
        !structure.dead &&
        structure.team === builder.team &&
        !structure.construction &&
        structure.hp < structure.maxHp * 0.92
      ))
      .sort((a, b) => {
        const urgencyA = 1 - a.hp / a.maxHp
        const urgencyB = 1 - b.hp / b.maxHp
        const scoreA = Math.hypot(a.x - builder.x, a.y - builder.y) - urgencyA * 180
        const scoreB = Math.hypot(b.x - builder.x, b.y - builder.y) - urgencyB * 180
        return scoreA - scoreB
	      })[0]
	  }
	
	  private isBuilderConstructing(builder: RtsUnit) {
	    return Boolean(this.builderConstruction(builder))
	  }
	
	  private builderConstruction(builder: RtsUnit) {
	    return this.structures.find((structure) => (
	      !structure.dead &&
	      structure.team === builder.team &&
	      structure.construction?.builderId === builder.id
	    ))
	  }
	
	  private canTargetThreatenUnit(candidate: CombatTarget, unit: RtsUnit) {
	    if ('container' in candidate) return Boolean(this.weaponForTarget(candidate, unit))
	    if ('kind' in candidate) return this.canStructureAttackTarget(candidate, unit)
	    return false
	  }
	
	  private reassignOrphanConstruction() {
	    for (const structure of this.structures) {
	      if (structure.dead || !structure.construction) continue
	      const assigned = this.units.some((unit) => (
	        !unit.dead &&
	        unit.team === structure.team &&
	        unit.def.builder &&
	        unit.id === structure.construction?.builderId
	      ))
	      if (assigned) continue
	
	      const replacement = this.units
	        .filter((unit) => (
	          !unit.dead &&
	          unit.team === structure.team &&
	          unit.def.builder &&
	          !this.isBuilderConstructing(unit)
	        ))
	        .sort((a, b) => Math.hypot(a.x - structure.x, a.y - structure.y) - Math.hypot(b.x - structure.x, b.y - structure.y))[0]
	
	      if (replacement) {
	        structure.construction.builderId = replacement.id
	        replacement.commandUntil = Math.max(replacement.commandUntil, 90)
	        replacement.target = undefined
	      }
	    }
	  }
	
	  private updateUnitTactics(unit: RtsUnit, delta: number) {
	    if (this.maybeRetreatBuilder(unit)) return
	    if (this.maybeRetreatForRepair(unit)) return

    const target = this.resolveTarget(unit)
    unit.target = target

    if (target) {
      const weapon = this.weaponForTarget(unit, target)
      if (!weapon) {
        unit.pendingWeapon = undefined
        return
      }

      if (unit.def.attackMovement === 'bomber' && weapon.kind === 'bomb') {
        this.updateBomberAttack(unit, target, weapon, delta)
        return
      }

      const distance = Math.hypot(this.targetX(target) - unit.x, this.targetY(target) - unit.y)
      if (distance <= unit.def.range) {
        const aimRotation = Math.atan2(this.targetY(target) - unit.y, this.targetX(target) - unit.x) + Math.PI / 2
        const moving = unit.pathIndex < unit.path.length
        const mobileFire = this.canAttackWhileMoving(unit)
        const hasIndependentTurret = Boolean(unit.turret || unit.turretParts.length > 0)
        const needsBodyAim = unit.def.fixedFiring || !hasIndependentTurret
        if (!moving || !mobileFire) {
          unit.path = []
          unit.pathIndex = 0
          unit.desiredRotation = aimRotation
        }
        if (needsBodyAim && (!moving || !mobileFire) && this.angularDifference(unit.sprite.rotation, aimRotation) > 0.32) return
        if (hasIndependentTurret && this.angularDifference(unit.turretRotation, aimRotation) > 0.5) return
        if (unit.attackCooldown <= 0 && delta > 0) {
          if (weapon.warmup > 0) {
            if (
              !unit.pendingWeapon ||
              unit.pendingWeapon.weapon !== weapon ||
              unit.pendingWeapon.target !== target
            ) {
              unit.pendingWeapon = { weapon, target, remaining: weapon.warmup }
            }
            unit.pendingWeapon.remaining -= delta
            if (unit.pendingWeapon.remaining > 0) return
          }
          this.fireAt(unit, target, weapon)
          unit.attackCooldown = weapon.cooldown
          unit.pendingWeapon = undefined
        }
        return
      }
    }

	    unit.pendingWeapon = undefined
	    if (!target && !unit.def.builder && this.frameCount < 3200) return
	
	    if (unit.team === 'enemy' || unit.commandUntil <= 0) {
      if (unit.aiCooldown <= 0 && unit.pathIndex >= unit.path.length) {
        const goal = target
          ? this.pixelToCell(this.targetX(target), this.targetY(target))
          : this.pickStrategicTarget(unit)
	        const cell = this.findClosestWalkable(goal, unit)
	        if (cell) {
	          this.rebuildPathReservations(unit)
	          unit.path = this.findPath(this.pixelToCell(unit.x, unit.y), cell, unit)
	          unit.pathIndex = 0
	          this.reserveUnitPath(unit)
	        }
        unit.aiCooldown = 36 + this.random() * 48
      }
    }
  }

	  private canAttackWhileMoving(unit: RtsUnit) {
    if (unit.def.attackMovement === 'bomber') return true
    if (unit.turret || unit.turretParts.length > 0) return true
    return Boolean(unit.def.flying && unit.def.attackKind !== 'bomb')
  }

  private updateBomberAttack(unit: RtsUnit, target: CombatTarget, weapon: WeaponDef, delta: number) {
    const tx = this.targetX(target)
    const ty = this.targetY(target)
    const distance = Math.hypot(tx - unit.x, ty - unit.y)
    const dropDistance = Math.max(GRID_SIZE * 2.1, Math.min(unit.def.range * 0.92, unit.def.height * 1.12))

    unit.desiredRotation = Math.atan2(ty - unit.y, tx - unit.x) + Math.PI / 2

    if (distance <= dropDistance) {
      if (unit.attackCooldown <= 0 && delta > 0) {
        this.fireAt(unit, target, weapon)
        unit.attackCooldown = weapon.cooldown
        unit.pendingWeapon = undefined
      }

      if (unit.pathIndex >= unit.path.length) {
        const flyThrough = this.bomberFlyThroughCell(unit, target)
        if (flyThrough) {
          this.setBomberFlightPath(unit, flyThrough, true)
        }
      }
      return
    }

    unit.pendingWeapon = undefined
    if (unit.aiCooldown <= 0 || unit.pathIndex >= unit.path.length) {
      const flyThrough = this.bomberFlyThroughCell(unit, target)
      const targetCell = flyThrough ?? this.findClosestWalkable(this.pixelToCell(tx, ty), unit)
      if (targetCell) {
        this.setBomberFlightPath(unit, targetCell, unit.pathIndex >= unit.path.length)
      }
      unit.aiCooldown = 24 + this.random() * 18
    }
  }

  private setBomberFlightPath(unit: RtsUnit, targetCell: GridPoint, force = false) {
    const currentEnd = unit.path[unit.path.length - 1]
    if (!force && currentEnd) {
      const drift = Math.hypot(currentEnd.x - targetCell.x, currentEnd.y - targetCell.y)
      if (drift < 3) return
    }

    unit.path = [targetCell]
    unit.pathIndex = 0
  }

  private bomberFlyThroughCell(unit: RtsUnit, target: CombatTarget) {
    const tx = this.targetX(target)
    const ty = this.targetY(target)
    const dx = tx - unit.x
    const dy = ty - unit.y
    const distance = Math.hypot(dx, dy)
    if (distance <= 0) return undefined

    const overshoot = Math.max(GRID_SIZE * 3, unit.def.height * 1.4)
    return this.findClosestWalkable(this.pixelToCell(
      tx + (dx / distance) * overshoot,
      ty + (dy / distance) * overshoot,
    ), unit)
  }

  private resolveTarget(unit: RtsUnit) {
    const searchRange = this.unitTargetSearchRange(unit)
    if (unit.target && this.isTargetAlive(unit.target) && unit.target.team !== unit.team && this.canUnitAttackTarget(unit, unit.target)) {
      const distance = Math.hypot(this.targetX(unit.target) - unit.x, this.targetY(unit.target) - unit.y)
      if (distance <= searchRange) return unit.target
    }

    const enemy = this.findNearestEnemy(unit, searchRange)
    if (enemy) return enemy

    const enemyBase = unit.team === 'player' ? this.enemyBase : this.playerBase
    const baseDistance = Math.hypot(this.targetX(enemyBase) - unit.x, this.targetY(enemyBase) - unit.y)
    if (baseDistance <= searchRange && this.canUnitAttackTarget(unit, enemyBase)) return enemyBase

    return undefined
  }

  private unitTargetSearchRange(unit: RtsUnit) {
    if (unit.def.attackMovement === 'bomber') {
      return Math.max(unit.def.range * 3.6, unit.def.height * 4.2, GRID_SIZE * 10)
    }
    return unit.def.range * 1.55
  }

	  private pickStrategicTarget(unit: RtsUnit) {
	    const opposingBase = unit.team === 'player' ? this.enemyBase : this.playerBase
	    const nearest = this.findNearestEnemy(unit, 420)
	    if (nearest && this.random() > 0.25) return this.pixelToCell(nearest.x, nearest.y)
	    if (unit.def.builder) {
	      const resourceTarget = this.pickUnclaimedResourceTarget(unit)
	      if (resourceTarget && this.random() > 0.18) return resourceTarget
	    }
	    return { x: opposingBase.x, y: opposingBase.y }
	  }
	
	  private pickUnclaimedResourceTarget(unit: RtsUnit) {
	    let best: ResourceNode | undefined
	    let bestScore = Infinity
	
	    for (const node of this.resourceNodes) {
	      if (node.amount <= 0) continue
	      if (this.resourceHasExtractor(node)) continue
	      const distance = Math.hypot(node.x - unit.x, node.y - unit.y)
	      const score = distance
	      if (score < bestScore) {
	        best = node
	        bestScore = score
	      }
    }

    return best ? this.pixelToCell(best.x, best.y) : undefined
  }

  private moveUnit(unit: RtsUnit, delta: number) {
    if (delta <= 0) return
    if (unit.pathIndex >= unit.path.length) {
      unit.currentSpeed = Math.max(0, unit.currentSpeed - this.unitBrake(unit) * delta)
      return
    }

    const target = unit.path[unit.pathIndex]
    const targetX = target.x * GRID_SIZE + GRID_SIZE / 2
    const targetY = target.y * GRID_SIZE + GRID_SIZE / 2
    const dx = targetX - unit.x
    const dy = targetY - unit.y
    const distance = Math.hypot(dx, dy)

    if (unit.def.attackMovement === 'bomber') {
      this.moveBomberUnit(unit, dx, dy, distance, delta)
      return
    }

    if (distance < 1.8) {
      unit.pathIndex++
      unit.currentSpeed *= 0.64
      return
    }

    const currentCell = this.pixelToCell(unit.x, unit.y)
    const nextCell = this.pixelToCell(targetX, targetY)
    const slope = Math.abs((this.heightMap[nextCell.x]?.[nextCell.y] ?? 0) - (this.heightMap[currentCell.x]?.[currentCell.y] ?? 0))
    const terrainSpeed = this.terrainSpeedMultiplier(this.terrainMap[currentCell.x]?.[currentCell.y] ?? 'shortGrass', unit)
    const slopeSpeed = this.movementLayer(unit.def) !== 'ground' ? 1 : Math.max(0.45, 1 - slope * 2.2)
    const targetSpeed = unit.speed * terrainSpeed * slopeSpeed
    if (unit.currentSpeed < targetSpeed) {
      unit.currentSpeed = Math.min(targetSpeed, unit.currentSpeed + this.unitAcceleration(unit) * delta)
    } else {
      unit.currentSpeed = Math.max(targetSpeed, unit.currentSpeed - this.unitBrake(unit) * delta)
    }

    const desiredX = dx / distance
    const desiredY = dy / distance
    const avoidance = this.unitAvoidanceVector(unit, desiredX, desiredY)
    const moveLength = Math.max(0.001, Math.hypot(avoidance.x, avoidance.y))
    const moveX = avoidance.x / moveLength
    const moveY = avoidance.y / moveLength
    const step = Math.min(distance, unit.currentSpeed * delta * avoidance.speedScale)
    const nextX = unit.x + moveX * step
    const nextY = unit.y + moveY * step
    if (this.movementLayer(unit.def) === 'air' || this.isCellPassable(Math.floor(nextX / GRID_SIZE), Math.floor(nextY / GRID_SIZE), unit)) {
      unit.x = nextX
      unit.y = nextY
      unit.desiredRotation = Math.atan2(moveY, moveX) + Math.PI / 2
    } else {
      unit.x += desiredX * step
      unit.y += desiredY * step
      unit.desiredRotation = Math.atan2(dy, dx) + Math.PI / 2
    }
  }

  private unitAvoidanceVector(unit: RtsUnit, dirX: number, dirY: number) {
    const layer = this.movementLayer(unit.def)
    const bucketSize = GRID_SIZE * 2
    const centerX = Math.floor(unit.x / bucketSize)
    const centerY = Math.floor(unit.y / bucketSize)
    const radius = this.unitCollisionRadius(unit)
    const lookAhead = Math.max(GRID_SIZE * 1.8, radius * 4 + unit.currentSpeed * 12)
    let avoidX = dirX
    let avoidY = dirY
    let speedScale = 1

    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const bucket = this.unitSpatialHash.get(`${centerX + ox},${centerY + oy}`)
        if (!bucket) continue
        for (const other of bucket) {
          if (other === unit || other.dead || this.movementLayer(other.def) !== layer) continue
          const relX = other.x - unit.x
          const relY = other.y - unit.y
          const forward = relX * dirX + relY * dirY
          if (forward < -radius || forward > lookAhead) continue
          const side = relX * -dirY + relY * dirX
          const laneWidth = radius + this.unitCollisionRadius(other) + 7
          if (Math.abs(side) > laneWidth) continue

          const otherDir = this.unitMoveDirection(other)
          const closing = otherDir ? dirX * otherDir.x + dirY * otherDir.y < -0.25 : false
          const passSide = side === 0 ? (unit.id % 2 === 0 ? 1 : -1) : -Math.sign(side)
          const force = (1 - Math.min(1, Math.abs(side) / laneWidth)) * (closing ? 0.78 : 0.42)
          avoidX += -dirY * passSide * force
          avoidY += dirX * passSide * force
          speedScale = Math.min(speedScale, closing ? 0.66 : 0.82)
        }
      }
    }

    return { x: avoidX, y: avoidY, speedScale }
  }

  private unitMoveDirection(unit: RtsUnit) {
    if (unit.pathIndex >= unit.path.length) return undefined
    const next = unit.path[unit.pathIndex]
    const dx = next.x * GRID_SIZE + GRID_SIZE / 2 - unit.x
    const dy = next.y * GRID_SIZE + GRID_SIZE / 2 - unit.y
    const distance = Math.hypot(dx, dy)
    if (distance <= 0) return undefined
    return { x: dx / distance, y: dy / distance }
  }

  private moveBomberUnit(unit: RtsUnit, dx: number, dy: number, distance: number, delta: number) {
    const waypointRadius = GRID_SIZE * 0.85
    if (distance < waypointRadius) {
      unit.pathIndex++
      unit.currentSpeed *= 0.94
      return
    }

    const currentCell = this.pixelToCell(unit.x, unit.y)
    const terrainSpeed = this.terrainSpeedMultiplier(this.terrainMap[currentCell.x]?.[currentCell.y] ?? 'shortGrass', unit)
    const targetSpeed = unit.speed * terrainSpeed
    if (unit.currentSpeed < targetSpeed) {
      unit.currentSpeed = Math.min(targetSpeed, unit.currentSpeed + this.unitAcceleration(unit) * delta)
    } else {
      unit.currentSpeed = Math.max(targetSpeed, unit.currentSpeed - this.unitBrake(unit) * delta)
    }

    const targetRotation = Math.atan2(dy, dx) + Math.PI / 2
    const maxTurn = this.bomberTurnRate(unit) * delta
    unit.sprite.rotation = this.rotateTowards(unit.sprite.rotation, targetRotation, maxTurn)
    unit.desiredRotation = unit.sprite.rotation

    const step = unit.currentSpeed * delta
    const nextX = unit.x + Math.sin(unit.sprite.rotation) * step
    const nextY = unit.y - Math.cos(unit.sprite.rotation) * step
    unit.x = Math.max(4, Math.min(this.boardWidth - 4, nextX))
    unit.y = Math.max(4, Math.min(this.boardHeight - 4, nextY))
  }

  private bomberTurnRate(unit: RtsUnit) {
    return unit.def.turnRate ?? Math.max(0.018, Math.min(0.045, unit.speed * 0.036))
  }

  private unitAcceleration(unit: RtsUnit) {
    if (unit.def.acceleration) return unit.def.acceleration
    if (unit.def.flying) return 0.065
    if (unit.def.role === 'experimental' || unit.def.role === 'mammoth' || unit.def.role === 'heavyArtillery') return 0.018
    if (unit.def.role === 'scout' || unit.def.role === 'spyDrone') return 0.055
    return 0.034
  }

  private unitBrake(unit: RtsUnit) {
    return unit.def.brake ?? this.unitAcceleration(unit) * 1.8
  }

	  private buildUnitSpatialHash() {
	    this.unitSpatialHash.clear()
	    for (const unit of this.units) {
	      if (unit.dead) continue
	      const key = this.spatialKey(unit.x, unit.y)
	      const bucket = this.unitSpatialHash.get(key)
	      if (bucket) bucket.push(unit)
	      else this.unitSpatialHash.set(key, [unit])
	    }
	    this.rebuildPathReservations()
	  }

	  private rebuildPathReservations(ignoreUnit?: RtsUnit) {
	    this.pathReservations.clear()
	    for (const unit of this.units) {
	      if (unit.dead || unit === ignoreUnit) continue
	      this.reserveUnitPath(unit)
	    }
	  }

	  private reserveUnitPath(unit: RtsUnit) {
	    if (unit.pathIndex >= unit.path.length) return
	    const layerWeight = this.movementLayer(unit.def) === 'air' ? 0.2 : 1
	    const horizon = Math.min(unit.path.length, unit.pathIndex + 38)
	    for (let i = unit.pathIndex; i < horizon; i++) {
	      const point = unit.path[i]
	      const urgency = 1 - (i - unit.pathIndex) / Math.max(1, horizon - unit.pathIndex)
	      this.addPathReservation(point, layerWeight * (0.35 + urgency * 1.15))
	      if (i - unit.pathIndex < 12) {
	        for (const neighbor of this.cardinalNeighbors(point)) {
	          this.addPathReservation(neighbor, layerWeight * 0.22 * urgency)
	        }
	      }
	    }
	  }

	  private addPathReservation(point: GridPoint, amount: number) {
	    if (!this.isInside(point.x, point.y)) return
	    const key = this.key(point)
	    this.pathReservations.set(key, (this.pathReservations.get(key) ?? 0) + amount)
	  }

  private resolveUnitCollisions(delta: number) {
    const strength = Math.min(1, 0.32 + delta * 0.05)
    const moved = new Set<RtsUnit>()

    for (const [key, bucket] of this.unitSpatialHash) {
      const [cellX, cellY] = key.split(',').map(Number)
      for (const unit of bucket) {
        if (unit.dead) continue
        const radius = this.unitCollisionRadius(unit)
        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const neighbors = this.unitSpatialHash.get(`${cellX + ox},${cellY + oy}`)
            if (!neighbors) continue
            for (const other of neighbors) {
              if (other === unit || other.dead || other.id <= unit.id) continue
              if (this.movementLayer(unit.def) !== this.movementLayer(other.def)) continue
              const otherRadius = this.unitCollisionRadius(other)
              const minDistance = radius + otherRadius
              let dx = other.x - unit.x
              let dy = other.y - unit.y
              let distance = Math.hypot(dx, dy)
              if (distance >= minDistance || distance <= 0) {
                if (distance > 0) continue
                const angle = ((unit.id * 97 + other.id * 53) % 360) * Math.PI / 180
                dx = Math.cos(angle)
                dy = Math.sin(angle)
                distance = 1
              }

              const push = ((minDistance - distance) / distance) * 0.5 * strength
              const pushX = dx * push
              const pushY = dy * push
              this.pushUnitForCollision(unit, -pushX, -pushY)
              this.pushUnitForCollision(other, pushX, pushY)
              unit.currentSpeed *= 0.985
              other.currentSpeed *= 0.985
              moved.add(unit)
              moved.add(other)
            }
          }
        }
      }
    }

    for (const unit of moved) {
      if (unit.pathIndex < unit.path.length) {
        const next = unit.path[unit.pathIndex]
        unit.desiredRotation = Math.atan2(next.y * GRID_SIZE + GRID_SIZE / 2 - unit.y, next.x * GRID_SIZE + GRID_SIZE / 2 - unit.x) + Math.PI / 2
      }
    }
  }

  private pushUnitForCollision(unit: RtsUnit, dx: number, dy: number) {
    const nextX = Math.max(4, Math.min(this.boardWidth - 4, unit.x + dx))
    const nextY = Math.max(4, Math.min(this.boardHeight - 4, unit.y + dy))
    if (this.movementLayer(unit.def) !== 'air' && !this.isCellPassable(Math.floor(nextX / GRID_SIZE), Math.floor(nextY / GRID_SIZE), unit)) return
    unit.x = nextX
    unit.y = nextY
  }

  private unitCollisionRadius(unit: RtsUnit) {
    const base = Math.max(5, Math.min(17, Math.max(unit.def.width, unit.def.height) * 0.32))
    return this.movementLayer(unit.def) === 'air' ? base * 0.75 : base
  }

  private spatialKey(x: number, y: number) {
    const size = GRID_SIZE * 2
    return `${Math.floor(x / size)},${Math.floor(y / size)}`
  }

  private fireAt(unit: RtsUnit, target: CombatTarget, weapon = this.weaponForTarget(unit, target)) {
    if (!weapon || !this.canWeaponAttackTarget(weapon, target)) return

    const kind = weapon.kind
    const color = unit.team === 'player' ? unit.def.color : 0xff6b6b
    const tx = this.targetX(target)
    const ty = this.targetY(target)
    const muzzle = kind === 'bomb'
      ? { localX: 0, localY: 0, worldX: unit.x, worldY: unit.y }
      : this.unitMuzzlePoint(unit)

    if (kind === 'lightning') {
      this.spawnLightning(muzzle.worldX, muzzle.worldY, tx, ty, color, weapon)
      this.applyDamage(target, weapon.damage)
      this.flashWeapon(unit, color, weapon)
      return
    }

    if (kind === 'laser' || kind === 'beam') {
      this.spawnBeam(muzzle.worldX, muzzle.worldY, tx, ty, color, Math.max(2, weapon.projectileSize), weapon)
      this.applyDamage(target, weapon.damage)
      this.spawnHitEffect(tx, ty, color, weapon, kind === 'beam' ? 14 : 11)
      this.flashWeapon(unit, color, weapon)
      return
    }

    if (kind === 'scan') {
      this.spawnScanPulse(muzzle.worldX, muzzle.worldY, tx, ty, color)
      this.applyDamage(target, weapon.damage)
      if ('container' in target && !target.dead) target.aiCooldown += 24
      this.flashWeapon(unit, color, weapon)
      return
    }

    const radius = weapon.projectileSize
    const view = this.createProjectileView(weapon, color)
    view.position.set(muzzle.worldX, muzzle.worldY)
    this.effectLayer.addChild(view as any)

    this.flashWeapon(unit, color, weapon)

    this.projectiles.push({
      x: muzzle.worldX,
      y: muzzle.worldY,
      target,
      sourceTeam: unit.team,
      damage: weapon.damage,
      speed: weapon.projectileSpeed,
      life: weapon.projectileLife,
      color,
	      radius,
	      splashRadius: weapon.splashRadius,
	      kind,
	      trailCooldown: 0,
	      view,
	    })
	  }
	
	  private createProjectileView(weapon: WeaponDef, color: number): Container {
	    if (weapon.kind === 'missile') {
	      const view = new Container()
	      const sprite = new Sprite(weapon.projectileTexture ?? Texture.from(missileProjectileImageUrl))
	      const width = Math.max(weapon.projectileSize * 4.2, 14)
	      const height = Math.max(weapon.projectileSize * 1.55, 5)
	      sprite.anchor.set(0.5)
	      sprite.width = width
	      sprite.height = height
	      sprite.rotation = -Math.PI / 2
	      view.addChild(sprite as any)
	
	      const flare = new Graphics()
	      flare.beginFill(0xfff1b8, 0.88)
	      flare.drawCircle(0, weapon.projectileSize * 2.2, Math.max(1.5, weapon.projectileSize * 0.42))
	      flare.endFill()
	      flare.beginFill(0xff8a4c, 0.45)
	      flare.drawCircle(0, weapon.projectileSize * 2.65, Math.max(2.2, weapon.projectileSize * 0.72))
	      flare.endFill()
	      view.addChild(flare as any)
	      return view
	    }
	
	    if (weapon.projectileTexture) {
	      const sprite = new Sprite(weapon.projectileTexture)
	      sprite.anchor.set(0.5)
	      sprite.width = weapon.projectileSize * 2.6
	      sprite.height = weapon.projectileSize * 2.6
	      sprite.tint = color
	      return sprite
	    }

    const view = new Graphics()
    const radius = weapon.projectileSize
    const frameColor = this.projectileFrameColor(weapon.projectileFrame, color)
    view.beginFill(frameColor)
	    if (weapon.kind === 'artillery' || weapon.kind === 'bomb') {
	      view.drawCircle(0, 0, radius)
	      view.lineStyle(1, 0xfff7ad, 0.8)
	      view.drawCircle(0, 0, radius + 2)
    } else if ((weapon.projectileFrame ?? 0) >= 9) {
      view.drawPolygon([0, -radius * 1.8, radius, radius * 0.9, 0, radius * 0.35, -radius, radius * 0.9])
    } else {
      view.drawCircle(0, 0, radius)
    }
    view.endFill()
    return view
  }

  private projectileFrameColor(frame: number | undefined, fallback: number) {
    if (frame === undefined) return fallback
    const colors = [fallback, 0xfff1b8, 0xffd166, 0xff8a4c, 0x8aa1ff, 0x93c5fd, 0xf472b6, 0xff5d73, 0x67e8a5, 0xfacc15, 0xffffff, 0x60a5fa]
    return colors[Math.abs(Math.trunc(frame)) % colors.length]
  }

  private flashWeapon(unit: RtsUnit, color: number, weapon?: WeaponDef) {
    const muzzle = this.unitMuzzlePoint(unit)
    unit.flash.clear()
    unit.flash.alpha = 1
    unit.flash.beginFill(color, 0.9)
    unit.flash.drawCircle(muzzle.localX, muzzle.localY, (weapon?.projectileSize ?? unit.def.projectileSize ?? 2) + 2)
    unit.flash.endFill()
  }

  private unitMuzzlePoint(unit: RtsUnit) {
    const rotation = unit.turret || unit.turretParts.length > 0 ? unit.turretRotation : unit.sprite.rotation
    let baseX = 0
    let baseY = 0
    let length = unit.def.height * 0.48

    if (unit.turret) {
      baseX = unit.turret.x
      baseY = unit.turret.y
      length = (unit.def.turretHeight ?? unit.def.height) * (unit.def.turretAnchorY ?? 0.5)
    }

    const parts = unit.def.turretParts ?? []
    if (parts.length > 0) {
      const part = parts.reduce((best, next) => ((next.height ?? 0) > (best.height ?? 0) ? next : best), parts[0])
      baseX = part.x
      baseY = part.y
      length = (part.height ?? unit.def.height) * (part.anchorY ?? 0.5)
    }

    const localX = baseX + Math.sin(rotation) * length
    const localY = baseY - Math.cos(rotation) * length
    return {
      localX,
      localY,
      worldX: unit.x + localX,
      worldY: unit.y + localY,
    }
  }

  private spawnLightning(fromX: number, fromY: number, toX: number, toY: number, color: number, weapon: WeaponDef) {
    const view = new Graphics()
    const distance = Math.hypot(toX - fromX, toY - fromY)
    const segments = Math.max(4, Math.min(13, Math.round(distance / 18)))
    const normalX = distance > 0 ? -(toY - fromY) / distance : 0
    const normalY = distance > 0 ? (toX - fromX) / distance : 0
    const jitter = Math.max(3, Math.min(12, weapon.projectileSize * 1.5))

    view.lineStyle(Math.max(1, weapon.projectileSize * 0.8), color, 0.92)
    for (let pass = 0; pass < 2; pass++) {
      view.moveTo(fromX, fromY)
      for (let i = 1; i < segments; i++) {
        const t = i / segments
        const offset = (this.random() - 0.5) * jitter * (pass === 0 ? 1 : 0.55)
        view.lineTo(
          fromX + (toX - fromX) * t + normalX * offset,
          fromY + (toY - fromY) * t + normalY * offset,
        )
      }
      view.lineTo(toX, toY)
      view.lineStyle(Math.max(1, weapon.projectileSize * 0.35), 0xffffff, 0.86)
    }

    const branchCount = Math.min(4, Math.max(1, Math.round(distance / 70)))
    view.lineStyle(1, 0xffffff, 0.65)
    for (let i = 0; i < branchCount; i++) {
      const t = 0.18 + this.random() * 0.64
      const bx = fromX + (toX - fromX) * t
      const by = fromY + (toY - fromY) * t
      const branchLength = 8 + this.random() * 16
      const side = this.random() > 0.5 ? 1 : -1
      view.moveTo(bx, by)
      view.lineTo(bx + normalX * branchLength * side, by + normalY * branchLength * side)
    }

    this.effectLayer.addChild(view as any)
    this.beams.push({ life: 10, maxLife: 10, color, width: weapon.projectileSize, view })
    this.spawnHitEffect(toX, toY, color, weapon, 18)
  }

  private spawnBeam(fromX: number, fromY: number, toX: number, toY: number, color: number, width: number, weapon?: WeaponDef) {
    const view = new Graphics()
    view.lineStyle(width, color, 0.9)
    view.moveTo(fromX, fromY)
    view.lineTo(toX, toY)
    view.lineStyle(Math.max(1, width * 0.45), 0xffffff, 0.74)
    view.moveTo(fromX, fromY)
    view.lineTo(toX, toY)
    this.effectLayer.addChild(view as any)
    const life = weapon?.kind === 'beam' ? 14 : 8
    this.beams.push({ life, maxLife: life, color, width, view })
  }

  private spawnHitEffect(x: number, y: number, color: number, weapon?: WeaponDef, maxRadius = 16) {
    if (weapon?.hitTexture) {
      const sprite = new Sprite(weapon.hitTexture)
      sprite.anchor.set(0.5)
      sprite.width = maxRadius * 2.2
      sprite.height = maxRadius * 2.2
      sprite.position.set(x, y)
      sprite.tint = color
      this.effectLayer.addChild(sprite as any)
      this.beams.push({ life: 14, maxLife: 14, color, width: maxRadius, view: sprite as any })
      return
    }

    this.spawnExplosion(x, y, color, maxRadius)
  }

  private spawnScanPulse(fromX: number, fromY: number, toX: number, toY: number, color: number) {
    this.spawnBeam(fromX, fromY, toX, toY, color, 1.5)
    const view = new Graphics()
    view.lineStyle(2, color, 0.9)
    view.drawCircle(toX, toY, 18)
    this.effectLayer.addChild(view as any)
    this.beams.push({ life: 12, maxLife: 12, color, width: 2, view })
  }

	  private spawnEngineerWorkEffect(builder: RtsUnit, targetX: number, targetY: number, color: number, force = false) {
	    if (!force && this.random() > 0.55) return
	
	    const view = new Graphics()
	    const dx = targetX - builder.x
	    const dy = targetY - builder.y
	    const distance = Math.max(1, Math.hypot(dx, dy))
	    const dirX = dx / distance
	    const dirY = dy / distance
	    const normalX = -dy / distance
	    const normalY = dx / distance
	    const phase = Math.sin(performance.now() / 120 + builder.id) * 18
	    const targetInset = Math.min(30, Math.max(14, distance * 0.18))
	    const sx = builder.x
	    const sy = builder.y
	    const hitX = targetX - dirX * targetInset + normalX * phase
	    const hitY = targetY - dirY * targetInset + normalY * phase
	
	    view.lineStyle(1.5, color, 0.78)
	    view.moveTo(sx, sy)
	    view.lineTo(hitX, hitY)
	    view.lineStyle(1, 0xffffff, 0.55)
	    view.moveTo(sx + normalX * 2, sy + normalY * 2)
	    view.lineTo(hitX - normalX * 5, hitY - normalY * 5)
	    view.lineStyle(1.2, color, 0.58)
	    view.moveTo(hitX - normalX * 8, hitY - normalY * 8)
	    view.lineTo(hitX + normalX * 8, hitY + normalY * 8)
	
	    for (let i = 0; i < 7; i++) {
	      const spread = 8 + this.random() * 24
	      const angle = this.random() * Math.PI * 2
	      const px = hitX + Math.cos(angle) * spread
	      const py = hitY + Math.sin(angle) * spread
	      view.beginFill(i % 2 === 0 ? 0xffffff : color, 0.82)
	      view.drawCircle(px, py, 1 + this.random() * 1.8)
	      view.endFill()
    }

    this.effectLayer.addChild(view as any)
    this.beams.push({ life: 9, maxLife: 9, color, width: 2, view })
  }

  private updateProjectiles(delta: number) {
    if (delta <= 0) return

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i]
      projectile.life -= delta

      if (!this.isTargetAlive(projectile.target) || projectile.life <= 0) {
        this.removeProjectile(i)
        continue
      }

      const tx = this.targetX(projectile.target)
      const ty = this.targetY(projectile.target)
      const dx = tx - projectile.x
      const dy = ty - projectile.y
      const distance = Math.hypot(dx, dy)

      if (distance <= projectile.speed * delta + 5) {
        if (projectile.splashRadius > 0) {
          this.applyAreaDamage(projectile.sourceTeam, tx, ty, projectile.damage, projectile.splashRadius)
        } else {
          this.applyDamage(projectile.target, projectile.damage)
        }
        this.spawnHitEffect(tx, ty, projectile.color, undefined, projectile.splashRadius > 0 ? projectile.splashRadius * 0.45 : 16)
        this.removeProjectile(i)
        continue
      }

	      const dirX = dx / distance
	      const dirY = dy / distance
	      projectile.x += dirX * projectile.speed * delta
	      projectile.y += dirY * projectile.speed * delta
	      projectile.view.position.set(projectile.x, projectile.y)
	      projectile.view.rotation = Math.atan2(dy, dx) + Math.PI / 2
	      if (projectile.kind === 'missile') this.spawnMissileTrail(projectile, dirX, dirY, delta)
	    }
	  }
	
	  private spawnMissileTrail(projectile: Projectile, dirX: number, dirY: number, delta: number) {
	    projectile.trailCooldown -= delta
	    if (projectile.trailCooldown > 0) return
	    projectile.trailCooldown = 1.8 + this.random() * 2.2
	
	    const tailX = projectile.x - dirX * projectile.radius * 2.4
	    const tailY = projectile.y - dirY * projectile.radius * 2.4
	    const view = new Graphics()
	    view.beginFill(0xfff1b8, 0.78)
	    view.drawCircle(tailX, tailY, Math.max(1.4, projectile.radius * 0.42))
	    view.endFill()
	    view.beginFill(0xff8a4c, 0.46)
	    view.drawCircle(tailX - dirX * 2, tailY - dirY * 2, Math.max(2.3, projectile.radius * 0.72))
	    view.endFill()
	    view.beginFill(0x94a3b8, 0.24)
	    view.drawCircle(
	      tailX - dirX * (5 + this.random() * 5),
	      tailY - dirY * (5 + this.random() * 5),
	      Math.max(3, projectile.radius * (0.75 + this.random() * 0.35)),
	    )
	    view.endFill()
	    this.effectLayer.addChild(view as any)
	    this.beams.push({ life: 13, maxLife: 13, color: 0xffd166, width: 2, view })
	  }
	
	  private applyAreaDamage(sourceTeam: Team, x: number, y: number, damage: number, radius: number) {
    const targets: CombatTarget[] = [
      ...this.units.filter((unit) => !unit.dead && unit.team !== sourceTeam),
      ...this.structures.filter((structure) => !structure.dead && structure.team !== sourceTeam),
      sourceTeam === 'player' ? this.enemyBase : this.playerBase,
    ]

    for (const target of targets) {
      const distance = Math.hypot(this.targetX(target) - x, this.targetY(target) - y)
      if (distance > radius) continue
      const falloff = 1 - distance / radius
      this.applyDamage(target, damage * (0.35 + falloff * 0.65))
    }
  }

  private removeProjectile(index: number) {
    const projectile = this.projectiles[index]
    this.effectLayer.removeChild(projectile.view as any)
    projectile.view.destroy()
    this.projectiles.splice(index, 1)
  }

  private spawnExplosion(x: number, y: number, color: number, maxRadius = 18) {
    const view = new Graphics()
    this.effectLayer.addChild(view as any)
    this.explosions.push({ x, y, color, radius: maxRadius, life: 16, maxLife: 16, view })
  }

  private updateBeams(delta: number) {
    for (let i = this.beams.length - 1; i >= 0; i--) {
      const beam = this.beams[i]
      beam.life -= delta
      beam.view.alpha = Math.max(0, beam.life / beam.maxLife)
      if (beam.life <= 0) {
        this.effectLayer.removeChild(beam.view as any)
        beam.view.destroy()
        this.beams.splice(i, 1)
      }
    }
  }

  private updateStructures(delta: number) {
    for (const structure of this.structures) {
      if (structure.dead) continue

      structure.attackCooldown -= delta
      if (structure.construction) {
        this.renderStructure(structure)
        continue
      }
      if (structure.kind === 'turret') {
        const target = this.findNearestEnemyForPoint(
          structure.team,
          structure.x,
          structure.y,
          structure.range,
          (candidate) => this.canStructureAttackTarget(structure, candidate),
        )
        const aligned = target ? this.aimStructureTurret(structure, target, Math.max(0.04, 0.08 * delta)) : false
        if (target && aligned && structure.attackCooldown <= 0 && delta > 0) {
          this.fireStructureAt(structure, target)
          structure.attackCooldown = structure.cooldown
        }
      } else if (structure.kind === 'repair' && delta > 0) {
        this.repairAround(structure, delta)
	      } else if ((structure.kind === 'factory' || structure.kind === 'airfield') && delta > 0) {
	        this.updateFactoryProduction(structure, delta)
      } else if (structure.kind === 'radar' && structure.attackCooldown <= 0 && delta > 0) {
        this.radarPulse(structure)
        structure.attackCooldown = structure.cooldown
      }
      this.renderStructure(structure)
    }
  }

  private repairAround(structure: StructureState, delta: number) {
    const heal = 0.18 * delta
    for (const unit of this.units) {
      if (unit.dead || unit.team !== structure.team) continue
      if (Math.hypot(unit.x - structure.x, unit.y - structure.y) <= structure.range) {
        unit.hp = Math.min(unit.maxHp, unit.hp + heal)
      }
    }
    for (const target of this.structures) {
      if (target.dead || target.team !== structure.team || target === structure) continue
      if (Math.hypot(target.x - structure.x, target.y - structure.y) <= structure.range) {
        target.hp = Math.min(target.maxHp, target.hp + heal * 0.6)
      }
    }
  }

	  private updateFactoryProduction(structure: StructureState, delta: number) {
    if (structure.production) {
      structure.production.progress = Math.min(structure.production.duration, structure.production.progress + delta)
      if (structure.production.progress >= structure.production.duration) {
        this.completeFactoryProduction(structure)
      }
      return
    }

    if (structure.attackCooldown > 0) return

    const alive = this.units.filter((unit) => unit.team === structure.team && !unit.dead).length
    const cap = this.unitCap(structure.team, 18)
    if (alive >= cap) {
      structure.attackCooldown = 90
      return
    }

	    const role = this.chooseStructureProductionRole(structure)
	    if (!role || !this.queueStructureProduction(structure, role)) {
	      structure.attackCooldown = 90
	    }
	  }
	
	  private queueStructureProduction(structure: StructureState, role: UnitRole) {
	    if (structure.dead || structure.construction || structure.production) return false
	    if (structure.kind === 'factory' && !this.isFactoryProducedRole(role)) return false
	    if (structure.kind === 'airfield' && !this.isAirProducedRole(role)) return false
	
	    const alive = this.units.filter((unit) => unit.team === structure.team && !unit.dead).length
	    if (alive >= this.unitCap(structure.team, 18)) return false
	
	    const cost = this.unitCost(role)
	    if (!this.spendResources(structure.team, cost)) return false
	    structure.production = {
	      role,
	      progress: 0,
	      duration: this.unitProductionDuration(role),
	    }
	    return true
	  }

  private completeFactoryProduction(structure: StructureState) {
    const alive = this.units.filter((unit) => unit.team === structure.team && !unit.dead).length
    const cap = this.unitCap(structure.team, 18)
    if (alive >= cap || !structure.production) return

    const role = structure.production.role
    const unit = this.createUnitFromFactory(structure, role, alive)
    this.units.push(unit)
    this.spawnExplosion(unit.x, unit.y, structure.team === 'player' ? 0x67e8a5 : 0xff6b6b)
    structure.production = undefined
    structure.attackCooldown = structure.cooldown
  }

	  private chooseStructureProductionRole(structure: StructureState): UnitRole | undefined {
	    return structure.kind === 'airfield'
	      ? this.chooseAirfieldRole(structure.team)
	      : this.chooseFactoryRole(structure.team)
	  }
	
	  private chooseAirfieldRole(team: Team): UnitRole | undefined {
	    const resources = this.resourcesFor(team)
	    const roles: UnitRole[] = resources > 230
	      ? ['bomber', 'gunship', 'heavyInterceptor', 'fireBee']
	      : resources > 135
	        ? ['helicopter', 'gunship', 'interceptor']
	        : ['spyDrone', 'interceptor']
	    return roles.find((role) => this.resourcesFor(team) >= this.unitCost(role)) ?? roles[roles.length - 1]
	  }
	
	  private chooseFactoryRole(team: Team): UnitRole {
	    const resources = this.resourcesFor(team)
	    const intent = this.aiIntent[team]
	    if (intent.defense > 0.7 && resources > 95) {
	      const roles: UnitRole[] = ['missile', 'laser', 'plasma', 'tank']
	      return roles[Math.floor(this.random() * roles.length)]
    }
    if (resources > 245) {
      const roles: UnitRole[] = ['mammoth', 'missile', 'laser', 'heavyArtillery']
      return roles[Math.floor(this.random() * roles.length)]
	    }
	    if (resources > 145) {
	      const roles: UnitRole[] = ['plasma', 'missile', 'laser', 'artillery']
	      return roles[Math.floor(this.random() * roles.length)]
	    }
	    return 'plasma'
	  }

  private radarPulse(structure: StructureState) {
    const target = this.findNearestEnemyForPoint(structure.team, structure.x, structure.y, structure.range)
    if (!target) return
    this.spawnScanPulse(structure.x, structure.y, this.targetX(target), this.targetY(target), structure.team === 'player' ? 0x8aa1ff : 0xff8aa1)
    for (const unit of this.units) {
      if (unit.dead || unit.team !== structure.team) continue
      if (Math.hypot(unit.x - structure.x, unit.y - structure.y) < structure.range) {
        unit.target = target
        unit.aiCooldown = Math.min(unit.aiCooldown, 12)
      }
    }
  }

  private aimStructureTurret(structure: StructureState, target: CombatTarget, maxStep = 0.08) {
    if (!structure.turretSprite) return true
    const targetRotation = Math.atan2(this.targetY(target) - structure.y, this.targetX(target) - structure.x) + Math.PI / 2
    structure.turretSprite.rotation = this.rotateTowards(structure.turretSprite.rotation, targetRotation, maxStep)
    return this.angularDifference(structure.turretSprite.rotation, targetRotation) < 0.2
  }

  private fireStructureAt(structure: StructureState, target: CombatTarget) {
    if (!this.canStructureAttackTarget(structure, target)) return

    const view = new Graphics()
    const color = structure.team === 'player' ? 0x67e8a5 : 0xff6b6b
    const muzzleX = structure.x + Math.sin(structure.turretSprite?.rotation ?? 0) * 18
    const muzzleY = structure.y - Math.cos(structure.turretSprite?.rotation ?? 0) * 18
    view.beginFill(color)
    view.drawCircle(0, 0, 3.4)
    view.endFill()
    view.position.set(muzzleX, muzzleY)
    this.effectLayer.addChild(view as any)

    structure.flash.clear()
    structure.flash.alpha = 1
    structure.flash.beginFill(color, 0.9)
    structure.flash.drawCircle(0, structure.kind === 'turret' ? -22 : -13, 5)
    structure.flash.endFill()

    this.projectiles.push({
      x: muzzleX,
      y: muzzleY,
      target,
      sourceTeam: structure.team,
      damage: structure.damage,
      speed: 6.8,
      life: 90,
      color,
      radius: 3.4,
	      splashRadius: 10,
	      kind: 'cannon',
	      trailCooldown: 0,
	      view,
	    })
	  }

	  private renderStructure(structure: StructureState) {
	    structure.view.clear()
	    structure.view.position.set(structure.x, structure.y)
	    const accent = structure.team === 'player' ? 0x67e8a5 : 0xff6b6b
	    const teamTint = structure.team === 'player' ? 0xe3fff0 : 0xffd7d7
	    const config = STRUCTURE_TEXTURES[structure.kind]
	    const dormantBlueprint = this.isDormantBlueprint(structure)
	    const constructionProgress = structure.construction
	      ? structure.construction.progress / Math.max(1, structure.construction.duration)
	      : 1
	    const structureAlpha = structure.dead
	      ? 0.38
	      : dormantBlueprint
	        ? 0.07
	        : structure.construction
	          ? 0.5 + constructionProgress * 0.5
	          : 1

	    for (const sprite of structure.sprites) {
	      sprite.alpha = structureAlpha
	      sprite.tint = structure.dead ? 0x666666 : teamTint
	    }

	    if (structure.turretSprite && !dormantBlueprint) {
	      const target = this.findNearestEnemyForPoint(
	        structure.team,
	        structure.x,
	        structure.y,
        structure.range,
        (candidate) => this.canStructureAttackTarget(structure, candidate),
      )
      if (target && !structure.dead) {
        this.aimStructureTurret(structure, target)
      } else if (structure.kind === 'radar') {
        structure.turretSprite.rotation += 0.02
      }
      structure.turretSprite.x = config.turretOffsetX ?? 0
      structure.turretSprite.y = config.turretOffsetY ?? 0
    }

    if (structure.doorSprite) {
      const open = structure.production ? Math.sin((structure.production.progress / Math.max(1, structure.production.duration)) * Math.PI) : 0
      structure.doorSprite.y = config.height * (0.08 + open * 0.12)
	    }

	    structure.hpBar.clear()
	    structure.hpBar.alpha = dormantBlueprint ? 0 : 1
	    structure.hpBar.beginFill(0x10131a, 0.82)
	    structure.hpBar.drawRect(-20, config.height / 2 + 4, 40, 4)
    structure.hpBar.endFill()
    structure.hpBar.beginFill(accent)
    structure.hpBar.drawRect(-20, config.height / 2 + 4, 40 * (structure.hp / structure.maxHp), 4)
    structure.hpBar.endFill()

    if (structure.production) {
      const progress = structure.production.progress / Math.max(1, structure.production.duration)
      structure.hpBar.beginFill(0x10131a, 0.82)
      structure.hpBar.drawRect(-20, config.height / 2 + 10, 40, 4)
      structure.hpBar.endFill()
      structure.hpBar.beginFill(0xffd166)
      structure.hpBar.drawRect(-20, config.height / 2 + 10, 40 * progress, 4)
      structure.hpBar.endFill()
    }
	    if (structure.construction && !dormantBlueprint) {
	      const progress = structure.construction.progress / Math.max(1, structure.construction.duration)
	      structure.hpBar.beginFill(0x10131a, 0.82)
	      structure.hpBar.drawRect(-20, config.height / 2 + 10, 40, 4)
      structure.hpBar.endFill()
      structure.hpBar.beginFill(0x67e8a5)
      structure.hpBar.drawRect(-20, config.height / 2 + 10, 40 * progress, 4)
      structure.hpBar.endFill()
    }

	    if ((structure.kind === 'radar' || structure.kind === 'repair') && !structure.dead && !dormantBlueprint) {
	      structure.view.lineStyle(1, accent, structure.kind === 'radar' ? 0.18 : 0.12)
	      structure.view.drawCircle(0, 0, structure.kind === 'radar' ? structure.range : structure.range * 0.55)
	    }

    structure.flash.alpha *= 0.75
	    if (structure.flash.alpha < 0.05) {
	      structure.flash.clear()
	      structure.flash.alpha = 1
	    }
	  }

	  private isDormantBlueprint(structure: StructureState) {
	    if (!structure.construction || structure.construction.progress > 1) return false
	    const builder = this.units.find((unit) => (
	      !unit.dead &&
	      unit.id === structure.construction?.builderId &&
	      unit.team === structure.team
	    ))
	    if (!builder) return true
	    return Math.hypot(builder.x - structure.x, builder.y - structure.y) > 104
	  }

	  private updateExplosions(delta: number) {
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const explosion = this.explosions[i]
      explosion.life -= delta
      const progress = 1 - Math.max(0, explosion.life / explosion.maxLife)

      explosion.view.clear()
      explosion.view.lineStyle(2, explosion.color, 1 - progress)
      explosion.view.drawCircle(explosion.x, explosion.y, 4 + progress * explosion.radius)

      if (explosion.life <= 0) {
        this.effectLayer.removeChild(explosion.view as any)
        explosion.view.destroy()
        this.explosions.splice(i, 1)
      }
    }
  }

  private applyDamage(target: CombatTarget, damage: number) {
    target.hp = Math.max(0, target.hp - damage)
    if ('container' in target && target.hp <= 0 && !target.dead) {
      this.killUnit(target)
    }
    if ('kind' in target && target.hp <= 0 && !target.dead) {
      target.dead = true
      target.flash.clear()
      target.hpBar.clear()
      this.spawnExplosion(target.x, target.y, 0xffc857)
      this.renderStructure(target)
    }
  }

  private killUnit(unit: RtsUnit) {
    unit.dead = true
    unit.currentSpeed = 0
    unit.path = []
    unit.pathIndex = 0
    unit.target = undefined
    unit.container.alpha = 0.34
    unit.sprite.tint = 0x656565
    unit.sprite.rotation += (this.random() - 0.5) * 1.2
    if (unit.turret) unit.turret.tint = 0x656565
    for (const part of unit.turretParts) part.tint = 0x656565
    if (unit.rotor) {
      unit.rotor.tint = 0x656565
      unit.rotor.alpha = 0.45
    }
    this.wreckLayer.addChild(unit.container as any)
    unit.hpBar.clear()
    unit.flash.clear()
    this.spawnExplosion(unit.x, unit.y, 0xffc857)
    this.selectedUnits = this.selectedUnits.filter((selected) => selected !== unit)
    if (this.activeBuilder === unit) this.activeBuilder = undefined
  }

  private renderUnit(unit: RtsUnit, delta: number) {
    if (unit.dead) return
    unit.container.alpha = 1
    unit.container.position.set(unit.x, unit.y)
    unit.hpBar.clear()
    unit.flash.alpha *= 0.78
    if (unit.flash.alpha < 0.05) {
      unit.flash.clear()
      unit.flash.alpha = 1
    }

    const moving = unit.pathIndex < unit.path.length || unit.currentSpeed > 0.05
    if (unit.frameTextures.length > 1) {
      if (moving && delta > 0) {
        unit.animationClock += delta * unit.def.animationSpeed
        const frame = Math.floor(unit.animationClock) % unit.frameTextures.length
        unit.sprite.texture = unit.frameTextures[frame]
      } else if (!moving) {
        unit.animationClock = 0
        unit.sprite.texture = unit.frameTextures[0]
      }
    }

    if (delta > 0) {
      const turnRate = unit.def.attackMovement === 'bomber' ? this.bomberTurnRate(unit) : 0.045
      unit.sprite.rotation = this.rotateTowards(unit.sprite.rotation, unit.desiredRotation, Math.min(0.28, turnRate * delta))
    }

    const bob = unit.def.flying && !moving ? Math.sin(performance.now() / 140 + unit.id) * 2 : 0
    unit.sprite.y = bob
    if (unit.rotor) {
      unit.rotor.y = bob + (unit.def.rotorOffsetY ?? 0)
      if (delta > 0) unit.rotor.rotation += delta * (unit.def.rotorSpin ?? 0.55)
    }
    if (unit.turret || unit.turretParts.length > 0) {
      const targetRotation = unit.target && this.isTargetAlive(unit.target)
        ? Math.atan2(this.targetY(unit.target) - unit.y, this.targetX(unit.target) - unit.x) + Math.PI / 2
        : unit.desiredRotation
      unit.turretRotation = this.rotateTowards(
        unit.turretRotation,
        targetRotation,
        Math.min(0.22, (unit.def.turretTurnRate ?? 0.11) * delta),
      )
      if (unit.turret) {
        unit.turret.rotation = unit.turretRotation
        unit.turret.x = unit.def.turretOffsetX ?? 0
        unit.turret.y = (unit.def.turretOffsetY ?? -4) + bob * 0.35
      }
      for (const [partIndex, part] of (unit.def.turretParts ?? []).entries()) {
        const partSprite = unit.turretParts[partIndex]
        partSprite.rotation = unit.turretRotation
        partSprite.x = part.x
        partSprite.y = part.y + bob * 0.35
      }
    }

    unit.hpBar.beginFill(0x10131a, 0.82)
    unit.hpBar.drawRect(-16, unit.def.height / 2 + 4, 32, 4)
    unit.hpBar.endFill()
    unit.hpBar.beginFill(unit.team === 'player' ? 0x67e8a5 : 0xff6b6b)
    unit.hpBar.drawRect(-16, unit.def.height / 2 + 4, 32 * (unit.hp / unit.maxHp), 4)
    unit.hpBar.endFill()
  }

  private drawTerrain() {
    this.terrainLayer.removeChildren()

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        const terrain = this.terrainMap[x]?.[y] ?? 'shortGrass'
        const height = this.heightMap[x]?.[y] ?? 0
        const tile = new Sprite(this.terrainTextures[terrain])
        tile.position.set(x * GRID_SIZE, y * GRID_SIZE)
        tile.width = GRID_SIZE
        tile.height = GRID_SIZE
        tile.alpha = this.map[x][y] === 1 ? 0.92 : 1
        tile.tint = this.terrainTint(terrain, height)
        this.terrainLayer.addChild(tile as any)
      }
    }
  }

  private drawMap() {
    this.mapLayer.clear()
    this.mapLayer.beginFill(0x05070a, 0.25)
    this.mapLayer.drawRect(0, 0, this.boardWidth, this.boardHeight)
    this.mapLayer.endFill()

    this.mapLayer.lineStyle(1, 0x0f1720, 0.08)
    for (let x = 0; x <= this.cols; x += 4) {
      this.mapLayer.moveTo(x * GRID_SIZE, 0)
      this.mapLayer.lineTo(x * GRID_SIZE, this.boardHeight)
    }
    for (let y = 0; y <= this.rows; y += 4) {
      this.mapLayer.moveTo(0, y * GRID_SIZE)
      this.mapLayer.lineTo(this.boardWidth, y * GRID_SIZE)
    }

    this.mapLayer.lineStyle(2, 0x05070a, 0.24)
    for (let x = 1; x < this.cols - 1; x++) {
      for (let y = 1; y < this.rows - 1; y++) {
        const height = this.heightMap[x]?.[y] ?? 0
        const right = this.heightMap[x + 1]?.[y] ?? height
        const down = this.heightMap[x]?.[y + 1] ?? height
        if (Math.abs(height - right) > 0.13) {
          this.mapLayer.moveTo((x + 1) * GRID_SIZE, y * GRID_SIZE)
          this.mapLayer.lineTo((x + 1) * GRID_SIZE, (y + 1) * GRID_SIZE)
        }
        if (Math.abs(height - down) > 0.13) {
          this.mapLayer.moveTo(x * GRID_SIZE, (y + 1) * GRID_SIZE)
          this.mapLayer.lineTo((x + 1) * GRID_SIZE, (y + 1) * GRID_SIZE)
        }
      }
    }

    this.drawTerrainBorders()

    this.mapLayer.lineStyle(2, 0x6f86ff, 0.9)
    this.mapLayer.drawRect(0, 0, this.boardWidth, this.boardHeight)

    this.drawResourceNodes()
    this.drawBase(this.playerBase, 0x67e8a5)
    this.drawBase(this.enemyBase, 0xff6b6b)
  }

  private drawTerrainBorders() {
    for (let x = 1; x < this.cols - 1; x++) {
      for (let y = 1; y < this.rows - 1; y++) {
        const cell = this.terrainMap[x]?.[y] ?? 'shortGrass'
        const right = this.terrainMap[x + 1]?.[y] ?? cell
        const down = this.terrainMap[x]?.[y + 1] ?? cell
        if (this.isWaterTerrain(cell) !== this.isWaterTerrain(right)) {
          this.mapLayer.lineStyle(2, 0x061018, 0.48)
          this.mapLayer.moveTo((x + 1) * GRID_SIZE, y * GRID_SIZE)
          this.mapLayer.lineTo((x + 1) * GRID_SIZE, (y + 1) * GRID_SIZE)
        }
        if (this.isWaterTerrain(cell) !== this.isWaterTerrain(down)) {
          this.mapLayer.lineStyle(2, 0x061018, 0.48)
          this.mapLayer.moveTo(x * GRID_SIZE, (y + 1) * GRID_SIZE)
          this.mapLayer.lineTo((x + 1) * GRID_SIZE, (y + 1) * GRID_SIZE)
        }
        if ((cell === 'mountain' || cell === 'stone') && right !== 'mountain' && right !== 'stone') {
          this.mapLayer.lineStyle(1, 0xd7d0c8, 0.24)
          this.mapLayer.moveTo((x + 1) * GRID_SIZE, y * GRID_SIZE)
          this.mapLayer.lineTo((x + 1) * GRID_SIZE, (y + 1) * GRID_SIZE)
        }
        if ((cell === 'mountain' || cell === 'stone') && down !== 'mountain' && down !== 'stone') {
          this.mapLayer.lineStyle(1, 0xd7d0c8, 0.24)
          this.mapLayer.moveTo(x * GRID_SIZE, (y + 1) * GRID_SIZE)
          this.mapLayer.lineTo((x + 1) * GRID_SIZE, (y + 1) * GRID_SIZE)
        }
      }
    }
  }

  private isWaterTerrain(terrain: TerrainType) {
    return terrain === 'water' || terrain === 'deepWater' || terrain === 'shallowWater'
  }

  private drawResourceNodes() {
    for (const node of this.resourceNodes) {
      const color = node.controller === 'player'
        ? 0x67e8a5
        : node.controller === 'enemy'
          ? 0xff6b6b
          : 0x8aa1ff
      const radius = 5 + Math.max(0, node.amount / 900) * 7

      this.mapLayer.beginFill(0x10131a, 0.76)
      this.mapLayer.drawCircle(node.x, node.y, radius + 5)
      this.mapLayer.endFill()
      this.mapLayer.beginFill(color, 0.82)
      this.mapLayer.drawCircle(node.x, node.y, radius)
      this.mapLayer.endFill()
      this.mapLayer.lineStyle(1, color, 0.7)
      this.mapLayer.drawCircle(node.x, node.y, 95)
    }
  }

  private drawBase(base: BaseState, color: number) {
    const x = base.x * GRID_SIZE
    const y = base.y * GRID_SIZE
    const centerX = x + GRID_SIZE / 2
    const centerY = y + GRID_SIZE / 2
    if (!base.sprite) {
      base.sprite = new Sprite(HQ_TEXTURE)
      base.sprite.anchor.set(0.5)
      base.sprite.width = 74
      base.sprite.height = 96
      this.terrainLayer.addChild(base.sprite as any)
    }
    base.sprite.position.set(centerX, centerY)
    base.sprite.tint = base.team === 'player' ? 0xe3fff0 : 0xffd7d7
    base.sprite.alpha = base.hp <= 0 ? 0.4 : 1

    this.mapLayer.beginFill(0x05070a, 0.42)
    this.mapLayer.drawEllipse(centerX, centerY + 31, 39, 12)
    this.mapLayer.endFill()
    this.mapLayer.beginFill(0x10131a, 0.82)
    this.mapLayer.drawRect(x - GRID_SIZE, y + GRID_SIZE * 3.18, GRID_SIZE * 3, 5)
    this.mapLayer.endFill()
    this.mapLayer.beginFill(color)
    this.mapLayer.drawRect(x - GRID_SIZE, y + GRID_SIZE * 3.18, GRID_SIZE * 3 * (base.hp / base.maxHp), 5)
    this.mapLayer.endFill()
    if (base.production) {
      const progress = base.production.progress / Math.max(1, base.production.duration)
      this.mapLayer.beginFill(0x10131a, 0.82)
      this.mapLayer.drawRect(x - GRID_SIZE, y + GRID_SIZE * 3.55, GRID_SIZE * 3, 5)
      this.mapLayer.endFill()
      this.mapLayer.beginFill(0xffd166)
      this.mapLayer.drawRect(x - GRID_SIZE, y + GRID_SIZE * 3.55, GRID_SIZE * 3 * progress, 5)
      this.mapLayer.endFill()
    }
  }

  private drawMinimap() {
    const width = this.app.screen.width
    const height = this.app.screen.height
    const viewportWidth = this.getViewportWidth()
    const minimapWidth = Math.min(260, Math.max(160, width >= 760 ? SIDEBAR_WIDTH - 44 : width - 24))
    const minimapHeight = Math.min(170, Math.max(110, minimapWidth * (this.boardHeight / Math.max(1, this.boardWidth))))
    const x = width >= 760 ? viewportWidth + 22 : 12
    const y = width >= 760 ? 70 : Math.max(12, height - minimapHeight - 12)
    const scaleX = minimapWidth / Math.max(1, this.boardWidth)
    const scaleY = minimapHeight / Math.max(1, this.boardHeight)

    this.minimapLayer.clear()
    this.minimapLayer.beginFill(0x071018, 0.9)
    this.minimapLayer.drawRoundedRect(x - 8, y - 8, minimapWidth + 16, minimapHeight + 16, 6)
    this.minimapLayer.endFill()
    this.minimapLayer.lineStyle(1, 0x8aa1ff, 0.65)
    this.minimapLayer.drawRoundedRect(x - 8, y - 8, minimapWidth + 16, minimapHeight + 16, 6)
    this.minimapLayer.lineStyle(0, 0x000000, 0)

    this.minimapLayer.beginFill(this.terrainColor('shortGrass'), 0.78)
    this.minimapLayer.drawRect(x, y, minimapWidth, minimapHeight)
    this.minimapLayer.endFill()

    const stride = this.cols > 100 ? 5 : 4
    for (let cx = 0; cx < this.cols; cx += stride) {
      for (let cy = 0; cy < this.rows; cy += stride) {
        const terrain = this.dominantMinimapTerrain(cx, cy, stride)
        if (terrain === 'shortGrass') continue
        const alpha = terrain === 'longGrass' ? 0.26 : this.map[cx]?.[cy] === 1 ? 0.9 : 0.72
        this.minimapLayer.beginFill(this.terrainColor(terrain), alpha)
        const blockX = Math.floor(x + cx * GRID_SIZE * scaleX)
        const blockY = Math.floor(y + cy * GRID_SIZE * scaleY)
        const nextX = Math.ceil(x + Math.min(this.cols, cx + stride) * GRID_SIZE * scaleX)
        const nextY = Math.ceil(y + Math.min(this.rows, cy + stride) * GRID_SIZE * scaleY)
        this.minimapLayer.drawRect(blockX, blockY, nextX - blockX + 2, nextY - blockY + 2)
        this.minimapLayer.endFill()
      }
    }

    for (const node of this.resourceNodes) {
      const color = node.controller === 'player' ? 0x67e8a5 : node.controller === 'enemy' ? 0xff6b6b : 0x8aa1ff
      this.minimapLayer.beginFill(color, 0.95)
      this.minimapLayer.drawCircle(x + node.x * scaleX, y + node.y * scaleY, 3)
      this.minimapLayer.endFill()
    }

    this.drawMinimapBase(this.playerBase, x, y, scaleX, scaleY, 0x67e8a5)
    this.drawMinimapBase(this.enemyBase, x, y, scaleX, scaleY, 0xff6b6b)

    for (const structure of this.structures) {
      if (structure.dead) continue
      this.minimapLayer.beginFill(structure.team === 'player' ? 0x67e8a5 : 0xff6b6b, 0.95)
      this.minimapLayer.drawRect(x + structure.x * scaleX - 2, y + structure.y * scaleY - 2, 4, 4)
      this.minimapLayer.endFill()
    }

    for (const unit of this.units) {
      if (unit.dead) continue
      const color = unit.team === 'player' ? 0x67e8a5 : 0xff6b6b
      const radius = unit.def.flying ? 2.3 : unit.def.role === 'experimental' || unit.def.role === 'fireBee' ? 3 : 1.8
      this.minimapLayer.beginFill(color, unit.def.flying ? 0.9 : 0.75)
      this.minimapLayer.drawCircle(x + unit.x * scaleX, y + unit.y * scaleY, radius)
      this.minimapLayer.endFill()
    }

    const cameraLeft = Math.max(0, -this.camera.x / this.camera.scale)
    const cameraTop = Math.max(0, -this.camera.y / this.camera.scale)
    const cameraWidth = Math.min(this.boardWidth, this.getViewportWidth() / this.camera.scale)
    const cameraHeight = Math.min(this.boardHeight, this.app.screen.height / this.camera.scale)
    this.minimapLayer.lineStyle(1, 0xf2f5ff, 0.9)
    this.minimapLayer.drawRect(x + cameraLeft * scaleX, y + cameraTop * scaleY, cameraWidth * scaleX, cameraHeight * scaleY)
  }

  private dominantMinimapTerrain(startX: number, startY: number, stride: number): TerrainType {
    const weights = new Map<TerrainType, number>()
    for (let x = startX; x < Math.min(this.cols, startX + stride); x++) {
      for (let y = startY; y < Math.min(this.rows, startY + stride); y++) {
        const terrain = this.terrainMap[x]?.[y] ?? 'shortGrass'
        const weight = terrain === 'deepWater' || terrain === 'water' || terrain === 'mountain'
          ? 3
          : terrain === 'shallowWater' || terrain === 'stone'
            ? 2
            : 1
        weights.set(terrain, (weights.get(terrain) ?? 0) + weight)
      }
    }

    return [...weights.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'shortGrass'
  }

  private drawMinimapBase(base: BaseState, x: number, y: number, scaleX: number, scaleY: number, color: number) {
    this.minimapLayer.beginFill(color, 0.95)
    this.minimapLayer.drawRoundedRect(
      x + (base.x * GRID_SIZE - GRID_SIZE) * scaleX,
      y + (base.y * GRID_SIZE - GRID_SIZE) * scaleY,
      GRID_SIZE * 3 * scaleX,
      GRID_SIZE * 3 * scaleY,
      2,
    )
    this.minimapLayer.endFill()
  }

  private terrainColor(terrain: TerrainType) {
    if (terrain === 'longGrass') return 0x2f6f3b
    if (terrain === 'dirt') return 0x68533a
    if (terrain === 'sand') return 0x9c814a
    if (terrain === 'stone') return 0x5f6670
    if (terrain === 'mountain') return 0x343840
    if (terrain === 'deepWater') return 0x12335d
    if (terrain === 'water') return 0x1d4d80
    if (terrain === 'shallowWater') return 0x2d7f8f
    return 0x3f7f43
  }

  private terrainTint(terrain: TerrainType, height: number) {
    const shade = Math.max(0, Math.min(1, height))
    if (terrain === 'deepWater') return 0x2a5fa5
    if (terrain === 'water') return 0x4e88d6
    if (terrain === 'shallowWater') return 0x5aa7aa
    if (terrain === 'mountain') return shade > 0.78 ? 0xd7d0c8 : 0x9da3aa
    if (terrain === 'stone') return shade > 0.62 ? 0xb6b0a9 : 0x8c9298
    if (terrain === 'sand') return shade > 0.48 ? 0xd1b16a : 0xb9944f
    if (terrain === 'dirt') return shade > 0.48 ? 0x8b6748 : 0x6d4f38
    if (terrain === 'longGrass') return shade > 0.48 ? 0x4b9145 : 0x36743b
    return shade > 0.48 ? 0x5a9f4f : 0x438645
  }

  private drawOverlay() {
    this.overlayLayer.clear()

    if (this.dragState?.moved) {
      const left = Math.min(this.dragState.worldStart.x, this.dragState.worldCurrent.x)
      const top = Math.min(this.dragState.worldStart.y, this.dragState.worldCurrent.y)
      const width = Math.abs(this.dragState.worldCurrent.x - this.dragState.worldStart.x)
      const height = Math.abs(this.dragState.worldCurrent.y - this.dragState.worldStart.y)
      this.overlayLayer.lineStyle(1, 0x8aa1ff, 0.95)
      this.overlayLayer.beginFill(0x6f86ff, 0.12)
      this.overlayLayer.drawRect(left, top, width, height)
      this.overlayLayer.endFill()
    }

    if (this.selectedCell) {
      this.overlayLayer.lineStyle(2, 0xffc857, 0.95)
      this.overlayLayer.drawRect(
        this.selectedCell.x * GRID_SIZE + 1,
        this.selectedCell.y * GRID_SIZE + 1,
        GRID_SIZE - 2,
        GRID_SIZE - 2,
      )
    }

    for (const unit of this.selectedUnits) {
      this.overlayLayer.lineStyle(2, 0x67e8a5, 1)
      this.overlayLayer.drawCircle(unit.x, unit.y, 15)
    }
  }

  private drawPath() {
    this.pathLayer.clear()
    if (this.selectedUnits.length === 0) return

    for (const unit of this.selectedUnits) {
      if (unit.pathIndex >= unit.path.length) continue
      this.pathLayer.lineStyle(2, 0x67e8a5, this.selectedUnits.length === 1 ? 0.95 : 0.5)
      this.pathLayer.moveTo(unit.x, unit.y)
      for (let i = unit.pathIndex; i < unit.path.length; i++) {
        const point = unit.path[i]
        this.pathLayer.lineTo(point.x * GRID_SIZE + GRID_SIZE / 2, point.y * GRID_SIZE + GRID_SIZE / 2)
      }
    }
  }

  private displayedIncome(team: Team) {
    let rate = team === 'player' ? 0.035 : 0.04
    for (const node of this.resourceNodes) {
      if (node.controller === team) rate += this.resourceHarvestRate(node, team) * 2.05
    }
    return Math.round(rate * 60)
  }

  private drawUi() {
    const width = this.app.screen.width
    const height = this.app.screen.height
    const sidebarX = this.getViewportWidth()
    const sidebarWidth = Math.max(0, width - sidebarX)
    const playerAlive = this.units.filter((unit) => unit.team === 'player' && !unit.dead).length
    const enemyAlive = this.units.filter((unit) => unit.team === 'enemy' && !unit.dead).length
    const playerTurrets = this.structures.filter((structure) => structure.team === 'player' && !structure.dead).length
    const enemyTurrets = this.structures.filter((structure) => structure.team === 'enemy' && !structure.dead).length
    const controlledNodes = this.resourceNodes.filter((node) => node.controller === 'player').length
	    const playerFactories = this.structures.filter((structure) => structure.team === 'player' && structure.kind === 'factory' && !structure.dead)
	    const playerAirfields = this.structures.filter((structure) => structure.team === 'player' && structure.kind === 'airfield' && !structure.dead)
	    const activeFactoryJobs = playerFactories.filter((structure) => structure.production).length
	    const activeAirJobs = playerAirfields.filter((structure) => structure.production).length
    const baseProduction = this.playerBase.production
      ? `${PRODUCTION_LABELS[this.playerBase.production.role]} ${Math.round((this.playerBase.production.progress / this.playerBase.production.duration) * 100)}%`
      : '空闲'
    const enemyBaseProduction = this.enemyBase.production
      ? `${PRODUCTION_LABELS[this.enemyBase.production.role]} ${Math.round((this.enemyBase.production.progress / this.enemyBase.production.duration) * 100)}%`
      : '空闲'
    const selectedPower = this.selectedUnits.reduce((sum, unit) => sum + Math.ceil(unit.hp), 0)
    const selected = this.selectedUnits.length === 1
      ? `#${this.selectedUnits[0].id} ${this.selectedUnits[0].def.iniName ?? this.selectedUnits[0].def.role}  HP ${Math.ceil(this.selectedUnits[0].hp)}/${this.selectedUnits[0].maxHp}`
      : this.selectedUnits.length > 1
        ? `${this.selectedUnits.length} 个单位`
      : this.selectedCell
        ? `地块 ${this.selectedCell.x}, ${this.selectedCell.y}`
        : '无'
    const commandRows = [
      ...PRODUCTION_BINDINGS.map((binding) => `${binding.key} ${PRODUCTION_LABELS[binding.role]} ${this.unitCost(binding.role)}`),
      `T 炮塔 ${this.structureCost('turret')}`,
      `Y 采集 ${this.structureCost('extractor')}`,
      `U 雷达 ${this.structureCost('radar')}`,
      `I 维修 ${this.structureCost('repair')}`,
      `O 工厂 ${this.structureCost('factory')}`,
      `P 空军 ${this.structureCost('airfield')}`,
    ]
    const commandLines = Array.from({ length: Math.ceil(commandRows.length / 2) }, (_, index) => {
      const left = commandRows[index * 2] ?? ''
      const right = commandRows[index * 2 + 1] ?? ''
      return `${left.padEnd(13, ' ')} ${right}`
    })

    this.uiBackground.clear()
    this.uiTitle.visible = true
    this.uiTitle.style = new TextStyle({
      fill: 0x22ff55,
      fontFamily: 'Menlo, Consolas, monospace',
      fontSize: 24,
      fontWeight: '700',
    })
    const resourceX = Math.max(12, sidebarX - 286)
    this.uiBackground.beginFill(0x041008, 0.78)
    this.uiBackground.drawRect(resourceX, 8, 274, 42)
    this.uiBackground.endFill()
    this.uiBackground.lineStyle(1, 0x1aff66, 0.45)
    this.uiBackground.drawRect(resourceX, 8, 274, 42)
    this.uiTitle.position.set(resourceX + 14, 14)
    this.uiTitle.text = `$${Math.floor(this.playerResources)}(+${this.displayedIncome('player')})`

    if (sidebarWidth > 0) {
      this.uiBackground.beginFill(0x0b1117, 0.94)
      this.uiBackground.drawRect(sidebarX, 0, sidebarWidth, height)
      this.uiBackground.endFill()
      this.uiBackground.lineStyle(1, 0x22ff55, 0.3)
      this.uiBackground.moveTo(sidebarX, 0)
      this.uiBackground.lineTo(sidebarX, height)

      this.uiStats.visible = true
      this.uiCommands.visible = true
      const cardX = sidebarX + 16
      const cardW = Math.max(180, sidebarWidth - 32)
      this.uiBackground.beginFill(0x0f1a16, 0.72)
      this.uiBackground.drawRect(cardX, 258, cardW, 112)
      this.uiBackground.endFill()
      this.uiBackground.lineStyle(1, 0x22ff55, 0.22)
      this.uiBackground.drawRect(cardX, 258, cardW, 112)
      this.uiStats.style = new TextStyle({
        fill: 0xbfe8d0,
        fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
        fontSize: 12,
        lineHeight: 20,
        wordWrap: true,
        wordWrapWidth: Math.max(170, sidebarWidth - 44),
      })
      this.uiStats.position.set(cardX + 10, 266)
      this.uiStats.style.wordWrapWidth = Math.max(180, sidebarWidth - 44)
      this.uiStats.text = [
        `${this.isPaused ? '暂停' : '运行'}  x${this.simulationSpeed.toFixed(2)}  代数 ${this.generation}`,
        `我方 ${playerAlive}  敌方 ${enemyAlive}  防御 ${playerTurrets}/${enemyTurrets}`,
        `资源点 ${controlledNodes}/${this.resourceNodes.length}  增援 ${Math.max(0, Math.ceil(this.reinforceTimer / 60))}s`,
        `基地 ${Math.ceil(this.playerBase.hp)}/${this.playerBase.maxHp}  ${baseProduction}`,
        `工厂 ${activeFactoryJobs}/${playerFactories.length}  空军 ${activeAirJobs}/${playerAirfields.length}`,
        `AI ${this.aiIntent.player.lastAction}`,
        `选中 ${selected}${this.selectedUnits.length > 1 ? `  血量 ${selectedPower}` : ''}`,
        this.stressMode ? '压测: 1000单位同屏' : '',
      ].filter(Boolean).join('\n')

      const gridX = cardX
      const gridY = 388
      const buttonW = Math.floor((cardW - 8) / 2)
      const buttonH = 27
      for (let row = 0; row < commandLines.length; row++) {
        for (let col = 0; col < 2; col++) {
          const buttonX = gridX + col * (buttonW + 8)
          const buttonY = gridY + row * (buttonH + 4)
          this.uiBackground.beginFill(0x16241d, 0.62)
          this.uiBackground.drawRect(buttonX, buttonY, buttonW, buttonH)
          this.uiBackground.endFill()
          this.uiBackground.lineStyle(1, 0x22ff55, 0.22)
          this.uiBackground.drawRect(buttonX, buttonY, buttonW, buttonH)
        }
      }
      this.uiCommands.position.set(gridX + 9, gridY + 8)
      this.uiCommands.text = commandLines.join('\n')
    } else {
      this.uiStats.visible = false
      this.uiCommands.visible = false
    }
  }

  private findPath(start: GridPoint, end: GridPoint, unit?: RtsUnit) {
    if (!this.isCellPassable(end.x, end.y, unit)) return []
    if (unit && this.movementLayer(unit.def) === 'air') return [end]

    const open: Array<GridPoint & { g: number; f: number; parent?: GridPoint }> = [
      { ...start, g: 0, f: 0 },
    ]
    const closed = new Set<string>()
    const best = new Map<string, number>()

    while (open.length > 0) {
      open.sort((a, b) => a.f - b.f)
      const current = open.shift()!
      const currentKey = this.key(current)

      if (current.x === end.x && current.y === end.y) {
        const path: GridPoint[] = []
        let cursor: typeof current | undefined = current
        while (cursor) {
          path.unshift({ x: cursor.x, y: cursor.y })
          cursor = cursor.parent as typeof current | undefined
        }
        return path.slice(1)
      }

      closed.add(currentKey)

      for (const neighbor of this.neighbors(current)) {
        const key = this.key(neighbor)
        if (closed.has(key) || !this.isCellPassable(neighbor.x, neighbor.y, unit)) continue

        const g = current.g + this.movementCost(current, neighbor, unit)
        if (best.has(key) && best.get(key)! <= g) continue

        best.set(key, g)
        const h = Math.max(Math.abs(neighbor.x - end.x), Math.abs(neighbor.y - end.y))
        open.push({ ...neighbor, g, f: g + h, parent: current })
      }
    }

    return []
  }

	  private movementCost(from: GridPoint, to: GridPoint, unit?: RtsUnit) {
	    const diagonal = from.x !== to.x && from.y !== to.y
	    const layer = unit ? this.movementLayer(unit.def) : 'ground'
	    if (layer === 'air') return diagonal ? 1.3 : 1

	    const terrain = this.terrainMap[to.x]?.[to.y] ?? 'shortGrass'
	    const speed = this.terrainSpeedMultiplier(terrain, unit)
	    const slope = Math.abs((this.heightMap[to.x]?.[to.y] ?? 0) - (this.heightMap[from.x]?.[from.y] ?? 0))
	    const terrainCost = (diagonal ? 1.4 : 1) * (1 / Math.max(0.25, speed)) * (layer === 'water' ? 1 : 1 + slope * 3)
	    return terrainCost + this.dynamicPathCost(to, unit)
	  }

	  private dynamicPathCost(point: GridPoint, unit?: RtsUnit) {
	    const def = this.subjectDef(unit)
	    const layer = def ? this.movementLayer(def) : 'ground'
	    if (layer === 'air') return 0

	    const reserved = this.pathReservations.get(this.key(point)) ?? 0
	    let cost = reserved * 5.2
	    const centerX = point.x * GRID_SIZE + GRID_SIZE / 2
	    const centerY = point.y * GRID_SIZE + GRID_SIZE / 2
	    const bucketX = Math.floor(centerX / (GRID_SIZE * 2))
	    const bucketY = Math.floor(centerY / (GRID_SIZE * 2))

	    for (let ox = -1; ox <= 1; ox++) {
	      for (let oy = -1; oy <= 1; oy++) {
	        const bucket = this.unitSpatialHash.get(`${bucketX + ox},${bucketY + oy}`)
	        if (!bucket) continue
	        for (const other of bucket) {
	          if (other.dead || other === unit) continue
	          if (this.movementLayer(other.def) !== layer) continue
	          const distance = Math.hypot(other.x - centerX, other.y - centerY)
	          if (distance > GRID_SIZE * 2.4) continue
	          const blocking = other.pathIndex >= other.path.length || other.currentSpeed < other.speed * 0.18
	          cost += (blocking ? 8.5 : 4.2) * Math.max(0, 1 - distance / (GRID_SIZE * 2.4))
	        }
	      }
	    }

	    return cost
	  }

	  private neighbors(point: GridPoint) {
	    return [
	      { x: point.x - 1, y: point.y },
	      { x: point.x + 1, y: point.y },
      { x: point.x, y: point.y - 1 },
      { x: point.x, y: point.y + 1 },
      { x: point.x - 1, y: point.y - 1 },
      { x: point.x + 1, y: point.y - 1 },
      { x: point.x - 1, y: point.y + 1 },
	      { x: point.x + 1, y: point.y + 1 },
	    ]
	  }

	  private cardinalNeighbors(point: GridPoint) {
	    return [
	      { x: point.x - 1, y: point.y },
	      { x: point.x + 1, y: point.y },
	      { x: point.x, y: point.y - 1 },
	      { x: point.x, y: point.y + 1 },
	    ]
	  }

  private eventToBoardPoint(event: PointerEvent | WheelEvent) {
    const screenPoint = this.eventToScreenPoint(event)
    if (!screenPoint) return undefined

    const point = this.screenToWorld(screenPoint.x, screenPoint.y)
    if (point.x < 0 || point.y < 0 || point.x >= this.boardWidth || point.y >= this.boardHeight) return undefined
    return point
  }

  private eventToScreenPoint(event: PointerEvent | WheelEvent) {
    const rect = (this.app.view as HTMLCanvasElement).getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (x < 0 || y < 0 || x >= this.getViewportWidth() || y >= this.app.screen.height) return undefined
    return { x, y }
  }

  private findNearestEnemy(unit: RtsUnit, maxDistance: number) {
    return this.findNearestEnemyForPoint(
      unit.team,
      unit.x,
      unit.y,
      maxDistance,
      (candidate) => this.canUnitAttackTarget(unit, candidate),
    )
  }

  private findNearestEnemyForPoint(
    team: Team,
    x: number,
    y: number,
    maxDistance: number,
    canTarget: (target: CombatTarget) => boolean = () => true,
  ) {
    let nearest: CombatTarget | undefined
    let nearestDistance = maxDistance
    const enemyBase = team === 'player' ? this.enemyBase : this.playerBase
    const baseDistance = Math.hypot(this.targetX(enemyBase) - x, this.targetY(enemyBase) - y)
    if (baseDistance < nearestDistance && enemyBase.hp > 0 && canTarget(enemyBase)) {
      nearest = enemyBase
      nearestDistance = baseDistance
    }

    if (this.unitSpatialHash.size > 0) {
      const bucketSize = GRID_SIZE * 2
      const centerX = Math.floor(x / bucketSize)
      const centerY = Math.floor(y / bucketSize)
      const radius = Math.ceil(maxDistance / bucketSize)
      for (let bx = centerX - radius; bx <= centerX + radius; bx++) {
        for (let by = centerY - radius; by <= centerY + radius; by++) {
          const bucket = this.unitSpatialHash.get(`${bx},${by}`)
          if (!bucket) continue
          for (const candidate of bucket) {
            if (candidate.dead || candidate.team === team) continue
            if (!canTarget(candidate)) continue
            const distance = Math.hypot(candidate.x - x, candidate.y - y)
            if (distance < nearestDistance) {
              nearest = candidate
              nearestDistance = distance
            }
          }
        }
      }
    } else {
      for (const candidate of this.units) {
        if (candidate.dead || candidate.team === team) continue
        if (!canTarget(candidate)) continue
        const distance = Math.hypot(candidate.x - x, candidate.y - y)
        if (distance < nearestDistance) {
          nearest = candidate
          nearestDistance = distance
        }
      }
    }

    for (const structure of this.structures) {
      if (structure.dead || structure.team === team) continue
      if (!canTarget(structure)) continue
      const distance = Math.hypot(structure.x - x, structure.y - y)
      if (distance < nearestDistance) {
        nearest = structure
        nearestDistance = distance
      }
    }

    return nearest
  }

  private isTargetAlive(target: CombatTarget) {
    return target.hp > 0 && (!('dead' in target) || !target.dead)
  }

  private targetX(target: CombatTarget) {
    if ('container' in target || 'kind' in target) return target.x
    return target.x * GRID_SIZE + GRID_SIZE / 2
  }

  private targetY(target: CombatTarget) {
    if ('container' in target || 'kind' in target) return target.y
    return target.y * GRID_SIZE + GRID_SIZE / 2
  }

  private screenToWorld(x: number, y: number) {
    return {
      x: (x - this.camera.x) / this.camera.scale,
      y: (y - this.camera.y) / this.camera.scale,
    }
  }

  private getViewportWidth() {
    return this.app.screen.width >= 760
      ? Math.max(0, this.app.screen.width - SIDEBAR_WIDTH)
      : this.app.screen.width
  }

  private applyCamera() {
    this.worldLayer.position.set(this.camera.x, this.camera.y)
    this.worldLayer.scale.set(this.camera.scale)
  }

  private clampCamera() {
    const viewportWidth = this.getViewportWidth()
    const viewportHeight = this.app.screen.height
    const scaledWidth = this.boardWidth * this.camera.scale
    const scaledHeight = this.boardHeight * this.camera.scale

    const minX = Math.min(0, viewportWidth - scaledWidth)
    const minY = Math.min(0, viewportHeight - scaledHeight)

    this.camera.x = Math.max(minX, Math.min(0, this.camera.x))
    this.camera.y = Math.max(minY, Math.min(0, this.camera.y))
  }

  private findUnitAt(x: number, y: number, team?: Team) {
    return this.units.find((unit) => (
      !unit.dead &&
      (!team || unit.team === team) &&
      Math.hypot(unit.x - x, unit.y - y) < Math.max(16, unit.def.width * 0.65)
    ))
  }

  private pixelToCell(x: number, y: number) {
    return {
      x: Math.max(0, Math.min(this.cols - 1, Math.floor(x / GRID_SIZE))),
      y: Math.max(0, Math.min(this.rows - 1, Math.floor(y / GRID_SIZE))),
    }
  }

  private isInside(x: number, y: number) {
    return x >= 0 && y >= 0 && x < this.cols && y < this.rows
  }

  private isWalkable(x: number, y: number) {
    return this.isInside(x, y) && this.map[x][y] === 0
  }

  private isCellPassable(x: number, y: number, subject?: RtsUnit | UnitDef) {
    if (!this.isInside(x, y)) return false
    const def = this.subjectDef(subject)
    const layer = def ? this.movementLayer(def) : 'ground'
    if (layer === 'air') return true
    const terrain = this.terrainMap[x]?.[y] ?? 'shortGrass'
    if (layer === 'water') return terrain === 'water' || terrain === 'deepWater' || terrain === 'shallowWater'

    if (this.map[x][y] === 1) return false
    if (terrain === 'water' || terrain === 'deepWater' || terrain === 'mountain') return false
    if ((this.heightMap[x]?.[y] ?? 0) > 0.68) return false
    return true
  }

  private terrainSpeedMultiplier(terrain: TerrainType, unit?: RtsUnit) {
    const layer = unit ? this.movementLayer(unit.def) : 'ground'
    if (layer === 'air') return 1
    if (layer === 'water') return terrain === 'shallowWater' ? 0.78 : terrain === 'deepWater' ? 1.08 : 1
    if (terrain === 'shallowWater') return 0.42
    if (terrain === 'sand') return 0.72
    if (terrain === 'longGrass') return 0.82
    if (terrain === 'dirt') return 0.92
    if (terrain === 'stone') return 0.68
    return 1
  }

  private subjectDef(subject?: RtsUnit | UnitDef) {
    if (!subject) return undefined
    return 'def' in subject ? subject.def : subject
  }

  private canUnitAttackTarget(unit: RtsUnit, target: CombatTarget) {
    return Boolean(this.weaponForTarget(unit, target))
  }

  private canStructureAttackTarget(structure: StructureState, target: CombatTarget) {
    return this.canAttackTarget(structure.canAttackFlying, structure.canAttackLand, target)
  }

  private weaponForTarget(unit: RtsUnit, target: CombatTarget) {
    const weapons = unit.def.weapons?.length
      ? unit.def.weapons
      : [{
        id: 'fallback',
        kind: unit.def.attackKind ?? 'bullet',
        damage: unit.def.damage,
        cooldown: unit.def.cooldown,
        warmup: 0,
        projectileSpeed: unit.def.projectileSpeed,
        projectileLife: unit.def.attackKind === 'artillery' || unit.def.attackKind === 'bomb' ? 150 : 100,
        splashRadius: unit.def.splashRadius ?? 0,
        projectileSize: unit.def.projectileSize ?? 3,
        canAttackFlying: unit.def.canAttackFlying,
        canAttackLand: unit.def.canAttackLand,
      }]
    return weapons.find((weapon) => this.canWeaponAttackTarget(weapon, target))
  }

  private canWeaponAttackTarget(weapon: WeaponDef, target: CombatTarget) {
    return this.canAttackTarget(weapon.canAttackFlying, weapon.canAttackLand, target)
  }

  private canAttackTarget(canAttackFlying: boolean | undefined, canAttackLand: boolean | undefined, target: CombatTarget) {
    return this.targetMovementLayer(target) === 'air'
      ? canAttackFlying !== false
      : canAttackLand !== false
  }

  private targetMovementLayer(target: CombatTarget): MovementLayer {
    if ('container' in target) return this.movementLayer(target.def)
    return 'ground'
  }

  private movementLayer(def: UnitDef): MovementLayer {
    const movementType = def.movementType?.toUpperCase()
    if (def.flying || movementType === 'AIR') return 'air'
    if (movementType === 'WATER') return 'water'
    return 'ground'
  }

  private rotateTowards(current: number, target: number, maxStep: number) {
    const delta = Math.atan2(Math.sin(target - current), Math.cos(target - current))
    if (Math.abs(delta) <= maxStep) return target
    return current + Math.sign(delta) * maxStep
  }

  private angularDifference(a: number, b: number) {
    return Math.abs(Math.atan2(Math.sin(b - a), Math.cos(b - a)))
  }

  private key(point: GridPoint) {
    return `${point.x},${point.y}`
  }

  private random() {
    this.rngSeed = (this.rngSeed * 1664525 + 1013904223) >>> 0
    return this.rngSeed / 0xffffffff
  }
}
