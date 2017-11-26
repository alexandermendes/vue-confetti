import Particles from './particles'

class Confetti {
  constructor () {
    this.ctx = null
    this.W = null
    this.H = null
    this.confetti = null
    this.droppedCount = 0
    this.particlesPerFrame = 1.5
    this.wind = 0
    this.windSpeed = 1
    this.windSpeedMax = 1
    this.windChange = 0.01
    this.windPosCoef = 0.002
    this.maxParticlesPerFrame = 2 // max particles dropped per frame
    this.count = 0
    this.colors = {
      options: [
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
      index: 0,
      step: 10,
      get color () {
        return this.options[((this.index++) / this.step | 0) % this.options.length]
      }
    }
  }

  /**
   * Create the confetti particles.
   */
  createParticles () {
    this.confetti = new Particles({
      ctx: this.ctx,
      W: this.W,
      H: this.H,
      colors: this.colors,
      wind: this.wind,
      windPosCoef: this.windPosCoef,
      windSpeedMax: this.windSpeedMax,
      count: this.count
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
    this.canvas.id = 'confetti-canvas'
    document.querySelector('body').appendChild(this.canvas)
  }

  /**
   * Start dropping confetti.
   */
  start () {
    if (this.canvas) {
      this.stop()
    }
    this.createContext()
    this.createParticles()
    this.particlesPerFrame = this.maxParticlesPerFrame
    requestAnimationFrame(this.mainLoop.bind(this))
  }

  /**
   * Stop dropping confetti.
   */
  stop () {
    this.particlesPerFrame = 0
    this.canvas.remove()
  }

  /**
   * Run the main animation loop.
   */
  mainLoop (time) {
    if (this.W !== window.innerWidth || this.H !== window.innerHeight) {
      this.W = this.canvas.width = window.innerWidth
      this.H = this.canvas.height = window.innerHeight
    } else {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0)
      this.ctx.clearRect(0, 0, this.W, this.H)
    }
    this.windSpeed = Math.sin(time / 8000) * this.windSpeedMax
    this.wind += this.windChange
    while (this.droppedCount < this.particlesPerFrame) {
      this.droppedCount += 1
      this.confetti.add()
    }
    this.droppedCount -= this.particlesPerFrame
    this.confetti.update()
    this.confetti.draw()
    requestAnimationFrame(this.mainLoop.bind(this))
  }
}

export default Confetti
