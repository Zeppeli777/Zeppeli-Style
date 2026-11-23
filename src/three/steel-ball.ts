import {
  ACESFilmicToneMapping, AdditiveBlending, BufferAttribute, BufferGeometry, Color, DirectionalLight,
  DynamicDrawUsage, Float32BufferAttribute, Group, Mesh, MeshStandardMaterial, OrthographicCamera,
  PMREMGenerator, Points, PointsMaterial, Scene, WebGLRenderer,
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

// Golden-spin trail: particles ride a golden-angle spiral around the ball,
// fading with additive blending while the spin is hot.
const PARTICLE_COUNT = 160
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

interface Particle {
  life: number
  decay: number
  angle: number
  spin: number
  radius: number
  grow: number
  y: number
  vy: number
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
    const rig = new Group()
    rig.add(ball)
    scene.add(rig)
    const key = new DirectionalLight(0xffeabd, 2)
    key.position.set(-3, 4, 3)
    scene.add(key)
    const rim = new DirectionalLight(0xf4d06a, 0.6)
    rim.position.set(2.5, -1.5, -2.5)
    scene.add(rim)

    const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
    const particleColors = new Float32Array(PARTICLE_COUNT * 3)
    const particleGeometry = new BufferGeometry()
    // BufferAttribute keeps the array by reference so per-frame writes reach the GPU;
    // Float32BufferAttribute would defensively copy it and freeze the trail at zeros.
    const positionAttribute = new BufferAttribute(particlePositions, 3).setUsage(DynamicDrawUsage)
    const colorAttribute = new BufferAttribute(particleColors, 3).setUsage(DynamicDrawUsage)
    particleGeometry.setAttribute('position', positionAttribute)
    particleGeometry.setAttribute('color', colorAttribute)
    cleanup.push(() => particleGeometry.dispose())
    const particleMaterial = new PointsMaterial({
      size: 4, sizeAttenuation: false, vertexColors: true,
      transparent: true, blending: AdditiveBlending, depthWrite: false,
    })
    cleanup.push(() => particleMaterial.dispose())
    const trail = new Points(particleGeometry, particleMaterial)
    trail.frustumCulled = false
    rig.add(trail)
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      ({ life: 0, decay: 1, angle: 0, spin: 0, radius: 1, grow: 0, y: 0, vy: 0 }))

    const camera = new OrthographicCamera(-1.06, 1.06, 1.06, -1.06, 0.1, 10)
    camera.position.z = 4
    const draw = () => renderer.render(scene, camera)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let velocityX = 0
    let velocityY = 0
    let flash = 0
    let time = 0
    let liveParticles = 0

    function respawn(index: number, boost: number) {
      const p = particles[index]
      p.life = 1
      p.decay = 0.7 + (index % 7) * 0.12
      p.angle = index * GOLDEN_ANGLE + time
      p.spin = (5 + (index % 5) * 1.3) * boost
      p.radius = 1.04 + ((index * 37) % 100) / 100 * 0.28
      p.grow = 0.25 + ((index * 13) % 10) * 0.03
      p.y = (((index * 53) % 100) / 100 - 0.5) * 1.1
      p.vy = (((index * 29) % 100) / 100 - 0.5) * 0.5
    }

    function burst(power: number) {
      for (let i = 0; i < PARTICLE_COUNT * 0.6; i++) respawn(i, Math.min(1.6, power))
    }

    // Advances motion and returns true while something is still animating.
    function update(dt: number) {
      time += dt
      const drag = Math.exp(-2.1 * dt)
      velocityX *= drag
      velocityY *= drag
      const idle = reduced.matches ? 0 : 0.45
      ball.rotation.y += (idle + velocityY) * dt
      ball.rotation.x += velocityX * dt
      const speed = Math.min(1, Math.hypot(velocityX, velocityY) / 12)
      rig.position.y = reduced.matches ? 0 : Math.sin(time * 1.15) * 0.03
      rig.rotation.z = reduced.matches ? 0 : Math.sin(time * 0.9) * (0.02 + speed * 0.06)
      flash *= Math.exp(-4.5 * dt)
      key.intensity = 2 + flash
      liveParticles = 0
      if (!reduced.matches && Math.abs(velocityY) > 3.5) {
        let emitted = 0
        for (let i = 0; i < PARTICLE_COUNT && emitted < 3; i++) {
          if (particles[i].life <= 0) {
            respawn(i, 1)
            emitted++
          }
        }
      }
      particles.forEach((p, i) => {
        if (p.life <= 0) return
        p.life -= p.decay * dt
        if (p.life <= 0) {
          particleColors[i * 3] = particleColors[i * 3 + 1] = particleColors[i * 3 + 2] = 0
          return
        }
        liveParticles++
        p.angle += p.spin * dt
        p.radius += p.grow * dt
        p.y += p.vy * dt
        const glow = Math.min(1, p.life) ** 2
        particlePositions[i * 3] = p.radius * Math.cos(p.angle)
        particlePositions[i * 3 + 1] = p.y
        particlePositions[i * 3 + 2] = p.radius * Math.sin(p.angle)
        particleColors[i * 3] = glow
        particleColors[i * 3 + 1] = 0.78 * glow
        particleColors[i * 3 + 2] = 0.32 * glow
      })
      positionAttribute.needsUpdate = true
      colorAttribute.needsUpdate = true
      const moving = Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01 || flash > 0.01 || liveParticles > 0
      return moving || !reduced.matches
    }

    let raf = 0
    let last = 0
    let looping = false
    let inView = true
    let pageVisible = !document.hidden
    function frame(now: number) {
      raf = 0
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000))
      last = now
      const active = update(dt)
      draw()
      if (active && inView && pageVisible) raf = requestAnimationFrame(frame)
      else looping = false
    }
    function start() {
      if (looping || !inView || !pageVisible) return
      looping = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    cleanup.push(() => cancelAnimationFrame(raf))

    const resize = () => {
      const size = Math.max(1, canvas.clientWidth)
      renderer.setSize(size, size, false)
      particleMaterial.size = Math.max(3, size * 0.016)
      draw()
      start()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    cleanup.push(() => observer.disconnect())
    const viewport = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting)
      if (inView) start()
    }, { threshold: 0.05 })
    viewport.observe(canvas)
    cleanup.push(() => viewport.disconnect())
    const onVisibility = () => {
      pageVisible = !document.hidden
      if (pageVisible) start()
    }
    document.addEventListener('visibilitychange', onVisibility)
    cleanup.push(() => document.removeEventListener('visibilitychange', onVisibility))
    const onMotionPreference = () => {
      draw()
      start()
    }
    reduced.addEventListener('change', onMotionPreference)
    cleanup.push(() => reduced.removeEventListener('change', onMotionPreference))
    start()

    return {
      rotate(dx: number, dy: number) {
        ball.rotation.y += dx
        ball.rotation.x += dy
        velocityY = Math.min(30, velocityY + dx * 6)
        velocityX = Math.min(30, velocityX + dy * 6)
        start()
      },
      spin(power = 1) {
        velocityY = Math.min(30, velocityY + 16 * power)
        velocityX = Math.min(30, velocityX + 3.2 * power)
        flash = Math.min(3, flash + 2.2 * power)
        if (!reduced.matches) burst(power)
        start()
      },
      dispose,
    }
  } catch (error) {
    dispose()
    throw error
  }
}
