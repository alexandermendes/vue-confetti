class Particle {
  setup ({ ctx, W, H, colors, wind, windPosCoef, windSpeedMax, count }) {
    this.ctx = ctx
    this.wind = wind
    this.windPosCoef = windPosCoef
    this.windSpeedMax = windSpeedMax
    this.x = this.rand(-35, this.W + 35)
    this.y = this.rand(-30, -35)
    this.r = this.rand(10, 30)
    this.d = this.rand(150) + 10 // density
    this.color = colors.color // get the next color
    this.tilt = this.randI(10)
    this.tiltAngleIncremental = (this.rand(0.08) + 0.04) * (this.rand() < 0.5 ? -1 : 1)
    this.tiltAngle = 0
    this.angle = this.rand(Math.PI * 2)
    this.count = count++
    return this
  }

  randI (min, max = min + (min = 0)) {
    return (Math.random() * (max - min) + min) | 0
  }

  rand (min = 1, max = min + (min = 0)) {
    return Math.random() * (max - min) + min
  }

  update () {
    this.tiltAngle += this.tiltAngleIncremental * (Math.cos(this.wind + (this.d + this.x + this.y) * this.windPosCoef) * 0.2 + 1)
    this.y += (Math.cos(this.angle + this.d) + 3 + this.r / 2) / 2
    this.x += Math.sin(this.angle)
    this.x += Math.cos(this.wind + (this.d + this.x + this.y) * this.windPosCoef) * this.windSpeedMax
    this.y += Math.sin(this.wind + (this.d + this.x + this.y) * this.windPosCoef) * this.windSpeedMax
    this.tilt = (Math.sin(this.tiltAngle - (this.count / 3))) * 15
    return this.y > this.H // returns true if particle is past bottom
  }

  draw () {
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.setTransform(
      Math.cos(this.tiltAngle), // set the x axis to the tilt angle
      Math.sin(this.tiltAngle),
      0, 1,
      this.x, this.y // set the origin
    )
    this.ctx.arc(0, 0, (this.r / 2), 0, Math.PI * 2, false)
    this.ctx.fill()
  }
}

export default Particle
