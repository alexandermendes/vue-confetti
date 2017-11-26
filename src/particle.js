class Particle {
  /**
   * Setup the particle.
   * @param {options} opts
   *   The particle options
   */
  setup ({ ctx, W, H, colors, wind, windPosCoef, windSpeedMax, count, shape }) {
    this.ctx = ctx
    this.W = W
    this.H = H
    this.wind = wind
    this.shape = shape
    this.windPosCoef = windPosCoef
    this.windSpeedMax = windSpeedMax
    this.x = this.rand(-35, W + 35)
    this.y = this.rand(-30, -35)
    this.d = this.rand(150) + 10 // density
    this.r = this.rand(10, 30)
    this.color = colors.color // get the next color
    this.tilt = this.randI(10)
    this.tiltAngleIncremental = (
      (this.rand(0.08) + 0.04) * (this.rand() < 0.5 ? -1 : 1)
    )
    this.tiltAngle = 0
    this.angle = this.rand(Math.PI * 2)
    this.count = count++
    return this
  }

  /**
   * Return a random number.
   * @param {Number} min
   *   The minimum number.
   * @param {Number} max
   *   The maximum number.
   */
  randI (min, max = min + (min = 0)) {
    return (Math.random() * (max - min) + min) | 0
  }

  /**
   * Return a random number with a minimum of one.
   * @param {Number} min
   *   The minimum number.
   * @param {Number} max
   *   The maximum number.
   */
  rand (min = 1, max = min + (min = 0)) {
    return Math.random() * (max - min) + min
  }

  /**
   * Update the particle.
   */
  update () {
    this.tiltAngle += (this.tiltAngleIncremental * (
      Math.cos(this.wind + (this.d + this.x + this.y) * this.windPosCoef) *
      0.2 + 1
    ))
    this.y += (Math.cos(this.angle + this.d) + 3 + this.r / 2) / 2
    this.x += Math.sin(this.angle)
    this.x += Math.cos(
      this.wind + (this.d + this.x + this.y) * this.windPosCoef
    ) * this.windSpeedMax
    this.y += Math.sin(
      this.wind + (this.d + this.x + this.y) * this.windPosCoef
    ) * this.windSpeedMax
    this.tilt = (Math.sin(this.tiltAngle - (this.count / 3))) * 15
    return this.y > this.H // returns true if particle is past bottom
  }

  /**
   * Draw a round particle.
   */
  drawCircle () {
    this.ctx.arc(0, 0, (this.r / 2), 0, Math.PI * 2, false)
    this.ctx.fill()
  }

  /**
   * Draw a rectangular particle.
   */
  drawRect () {
    this.ctx.fillRect(0, 0, this.r, this.r / 2)
  }

  /**
   * Draw a heart-shaped particle.
   */
  drawHeart () {
    const curveTo = (cp1x, cp1y, cp2x, cp2y, x, y) => {
      this.ctx.bezierCurveTo(
        cp1x / this.r * 2,
        cp1y / this.r * 2,
        cp2x / this.r * 2,
        cp2y / this.r * 2,
        x / this.r * 2,
        y / this.r * 2
      )
    }
    this.ctx.moveTo(37.5 / this.r, 20 / this.r)
    curveTo(75, 37, 70, 25, 50, 25)
    curveTo(20, 25, 20, 62.5, 20, 62.5)
    curveTo(20, 80, 40, 102, 75, 120)
    curveTo(110, 102, 130, 80, 130, 62.5)
    curveTo(130, 62.5, 130, 25, 100, 25)
    curveTo(85, 25, 75, 37, 75, 40)
    this.ctx.fill()
  }

  /**
   * Draw a particle.
   */
  draw () {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.setTransform(
      Math.cos(this.tiltAngle), // set the x axis to the tilt angle
      Math.sin(this.tiltAngle),
      0, 1,
      this.x, this.y // set the origin
    )
    if (this.shape === 'circle') {
      this.drawCircle()
    } else if (this.shape === 'rect') {
      this.drawRect()
    } else if (this.shape === 'heart') {
      this.drawHeart()
    }
  }
}

export default Particle
