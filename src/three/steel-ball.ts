import {
  ACESFilmicToneMapping, BufferGeometry, Color, DirectionalLight, Float32BufferAttribute,
  Mesh, MeshStandardMaterial, OrthographicCamera, PMREMGenerator, Scene, WebGLRenderer,
} from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

// The front and rear hexagons are projected onto a sphere. Extra vertices along
// their edges and the six connecting channels form the bevel and recessed floor.
function createGroovedSphere() {
  const step = Math.PI / 3
  const corner = 0.68
  const halfWidth = 0.042
  const bevel = [0.012, 0.026, halfWidth]
  const evenly = (count: number, start: number, end: number) =>
    Array.from({ length: count }, (_, i) => start + (end - start) * i / (count - 1))
  const angles = Array.from({ length: 6 }, (_, sector) =>
    [0, ...bevel, ...evenly(13, 0.08, step - 0.08), ...bevel.map(a => step - a).reverse()]
      .map(angle => sector * step + angle)).flat()
  const positions: number[] = []
  const colors: number[] = []
  const indices: number[] = []
  const base = new Color('#75a971')
  const floor = new Color('#213e34')
  const shade = new Color()
  let ringCount = 0
  angles.forEach((angle, column) => {
    const local = angle - Math.floor(angle / step) * step
    const cap = Math.atan(Math.tan(corner) * Math.cos(step / 2) / Math.cos(local - step / 2))
    const front = [...evenly(10, 0.05, cap - 0.08), cap - halfWidth, cap - 0.026, cap - 0.012,
      cap, cap + 0.012, cap + 0.026, cap + halfWidth]
    const rings = [...front, ...evenly(27, cap + 0.08, Math.PI - cap - 0.08), ...front.map(a => Math.PI - a).reverse()]
    ringCount = rings.length
    rings.forEach((theta, row) => {
      const fromPole = Math.min(theta, Math.PI - theta)
      const edge = Math.abs(fromPole - cap)
      const side = Math.sin(theta) * Math.sin(Math.min(local, step - local))
      const distance = fromPole < cap ? edge : Math.min(edge, side)
      const t = Math.min(1, distance / halfWidth)
      const inset = 1 - t * t * (3 - 2 * t)
      const radius = 1 - 0.035 * inset
      const radial = radius * Math.sin(theta)
      positions.push(radial * Math.cos(angle), radial * Math.sin(angle), radius * Math.cos(theta))
      shade.copy(base).lerp(floor, inset * 0.86)
      colors.push(shade.r, shade.g, shade.b)
      if (row + 1 < ringCount) {
        const a = column * ringCount + row
        const b = ((column + 1) % angles.length) * ringCount + row
        indices.push(a, a + 1, b, a + 1, b + 1, b)
      }
    })
  })
  const north = positions.length / 3
  positions.push(0, 0, 1, 0, 0, -1)
  colors.push(base.r, base.g, base.b, base.r, base.g, base.b)
  angles.forEach((_, i) => {
    const a = i * ringCount
    const b = ((i + 1) % angles.length) * ringCount
    indices.push(north, a, b, north + 1, b + ringCount - 1, a + ringCount - 1)
  })
  const geometry = new BufferGeometry()
  geometry.setIndex(indices)
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
  geometry.computeVertexNormals()
  return geometry
}

export function mountBall(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
  const cleanup: (() => void)[] = [() => { renderer.dispose(); renderer.forceContextLoss() }]
  const dispose = () => { while (cleanup.length) cleanup.pop()!() }
  try {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = ACESFilmicToneMapping
    const scene = new Scene()
    const studio = new RoomEnvironment()
    const generator = new PMREMGenerator(renderer)
    try {
      const environment = generator.fromScene(studio, 0.035)
      scene.environment = environment.texture
      cleanup.push(() => environment.dispose())
    } finally {
      studio.dispose()
      generator.dispose()
    }
    const geometry = createGroovedSphere()
    cleanup.push(() => geometry.dispose())
    const material = new MeshStandardMaterial({ vertexColors: true, metalness: 0.88, roughness: 0.32 })
    cleanup.push(() => material.dispose())
    const ball = new Mesh(geometry, material)
    ball.rotation.set(0.32, -0.33, 0.34, 'YXZ')
    scene.add(ball)
    const key = new DirectionalLight(0xffeabd, 2)
    key.position.set(-3, 4, 3)
    scene.add(key)
    const camera = new OrthographicCamera(-1.06, 1.06, 1.06, -1.06, 0.1, 10)
    camera.position.z = 4
    const draw = () => renderer.render(scene, camera)
    const resize = () => {
      const size = Math.max(1, canvas.clientWidth)
      renderer.setSize(size, size, false)
      draw()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    cleanup.push(() => observer.disconnect())
    return {
      rotate(dx: number, dy: number) {
        ball.rotation.y += dx
        ball.rotation.x += dy
        draw()
      },
      dispose,
    }
  } catch (error) {
    dispose()
    throw error
  }
}
