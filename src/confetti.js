import Particles from './particles'

class Confetti {
  constructor () {
    this.ctx = null
    this.W = 0
    this.H = 0
    this.particles = {}
    this.droppedCount = 0
    this.particlesPerFrame = 1.5
    this.wind = 0
    this.windSpeed = 1
    this.windSpeedMax = 1
    this.windChange = 0.01
    this.windPosCoef = 0.002
    this.maxParticlesPerFrame = 2 // max particles dropped per frame
    this.animationId = null
  }

  /**
   * Create the confetti particles.
   * @param {Object} opts
   *   The particle options.
   */
  createParticles (opts = {}) {
    this.particles = new Particles({
      ctx: this.ctx,
      W: this.W,
      H: this.H,
      wind: this.wind,
      windPosCoef: this.windPosCoef,
      windSpeedMax: this.windSpeedMax,
      count: 0,
      shape: opts.shape || 'circle',
      colors: {
        opts: opts.colors || [
          'DodgerBlue',
          'OliveDrab',
          'Gold',
          'pink',
          'SlateBlue',
          'lightblue',
          'Violet',
          'PaleGreen',
          'SteelBlue',
          'SandyBrown',
          'Chocolate',
          'Crimson'
        ],
        idx: 0,
        step: 10,
        get color () {
          return this.opts[((this.idx++) / this.step | 0) % this.opts.length]
        }
      }
    })
  }

  /**
   * Add a fixed, full-screen canvas to the page.
   */
  createContext () {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.style.display = 'block'
    this.canvas.style.position = 'fixed'
    this.canvas.style.pointerEvents = 'none'
    this.canvas.style.top = 0
    this.canvas.style.width = '100vw'
    this.canvas.style.height = '100vh'
    this.canvas.id = 'confetti-canvas'
    document.querySelector('body').appendChild(this.canvas)
  }

  /**
   * Start dropping confetti.
   * @param {Object} opts
   *   The particle options.
   */
  start (opts) {
    if (!this.ctx) {
      this.createContext()
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId) // Cancel any previous loop
    }
    this.createParticles(opts)
    this.updateDimensions()
    this.particlesPerFrame = this.maxParticlesPerFrame
    this.animationId = requestAnimationFrame(this.mainLoop.bind(this))
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  /**
   * Stop dropping confetti.
   */
  stop () {
    this.particlesPerFrame = 0
    window.removeEventListener('resize', this.updateDimensions)
  }

  /**
   * Update the dimensions, if necessary.
   */
  updateDimensions () {
    if (this.W !== window.innerWidth || this.H !== window.innerHeight) {
      this.W = this.particles.opts.W = this.canvas.width = window.innerWidth
      this.H = this.particles.opts.H = this.canvas.height = window.innerHeight
    }
  }

  /**
   * Run the main animation loop.
   */
  mainLoop (time) {
    this.updateDimensions()
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.clearRect(0, 0, this.W, this.H)
    this.windSpeed = Math.sin(time / 8000) * this.windSpeedMax
    this.wind = this.particles.opts.wind += this.windChange
    while (this.droppedCount < this.particlesPerFrame) {
      this.droppedCount += 1
      this.particles.add()
    }
    this.droppedCount -= this.particlesPerFrame
    this.particles.update()
    this.particles.draw()
    this.animationId = requestAnimationFrame(this.mainLoop.bind(this))
  }
}

export default Confetti
