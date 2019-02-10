/**
 * A particle that can be drawn on a canvas.
 */
export default class BaseParticle {
  /**
   * Setup.
   * @param {options} opts
   *   The particle options.
   */
  setup({
    ctx,
    W,
    H,
    colors,
    wind,
    windPosCoef,
    windSpeedMax,
    count,
    shape,
    size,
  }) {
    this.ctx = ctx;
    this.W = W;
    this.H = H;
    this.wind = wind;
    this.shape = shape;
    this.windPosCoef = windPosCoef;
    this.windSpeedMax = windSpeedMax;
    this.x = BaseParticle.rand(-35, W + 35);
    this.y = BaseParticle.rand(-30, -35);
    this.d = BaseParticle.rand(150) + 10; // density
    this.r = BaseParticle.rand(size, size * 2);
    this.color = colors.color; // get the next color
    this.tilt = BaseParticle.rand(10);
    this.tiltAngleIncremental = (
      (BaseParticle.rand(0.08) + 0.04) * (BaseParticle.rand() < 0.5 ? -1 : 1)
    );
    this.tiltAngle = 0;
    this.angle = BaseParticle.rand(Math.PI * 2);
    this.count = count + 1;
    return this;
  }

  /**
   * Return a random number.
   * @param {Number} [min]
   *   The minimum number (default 1).
   * @param {Number} [max]
   *   The maximum number.
   */
  static rand(min = 1, max = min + (min = 0)) { // eslint-disable-line no-param-reassign
    return Math.random() * (max - min) + min;
  }

  /**
   * Update the particle.
   */
  update() {
    this.tiltAngle += (this.tiltAngleIncremental * (
      Math.cos(this.wind + (this.d + this.x + this.y) * this.windPosCoef)
      * 0.2 + 1
    ));
    this.y += (Math.cos(this.angle + this.d) + 3 + this.r / 2) / 2;
    this.x += Math.sin(this.angle);
    this.x += Math.cos(
      this.wind + (this.d + this.x + this.y) * this.windPosCoef,
    ) * this.windSpeedMax;
    this.y += Math.sin(
      this.wind + (this.d + this.x + this.y) * this.windPosCoef,
    ) * this.windSpeedMax;
    this.tilt = (Math.sin(this.tiltAngle - (this.count / 3))) * 15;
    return this.y > this.H; // returns true if particle is past bottom
  }

  /**
   * Draw a particle.
   */
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.setTransform(
      Math.cos(this.tiltAngle), // set the x axis to the tilt angle
      Math.sin(this.tiltAngle),
      0,
      1,
      this.x,
      this.y, // set the origin
    );
  }
}
