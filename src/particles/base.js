import getRandomNumber from '../utils/get-random-number';

/**
 * A particle that can be drawn on a canvas.
 */
export default class BaseParticle {
  /**
   * Initialise.
   * @param {object} options
   *   The particle options.
   * @param {object} options.color
   *   The particle color.
   */
  constructor({ color = 'blue', size = 10 } = {}) {
    this.color = color;
    this.size = size;
  }

  /**
   * Setup.
   * @param {options} opts
   *   The particle options.
   */
  setup({
    ctx,
    W,
    H,
    wind,
    windPosCoef,
    windSpeedMax,
    count,
  }) {
    this.ctx = ctx;
    this.W = W;
    this.H = H;
    this.wind = wind;
    this.windPosCoef = windPosCoef;
    this.windSpeedMax = windSpeedMax;
    this.x = getRandomNumber(-35, W + 35);
    this.y = getRandomNumber(-30, -35);
    this.d = getRandomNumber(150) + 10; // density
    this.r = getRandomNumber(this.size, this.size * 2);
    this.tilt = getRandomNumber(10);
    this.tiltAngleIncremental = (
      (getRandomNumber(0, 0.08) + 0.04) * (getRandomNumber() < 0.5 ? -1 : 1)
    );
    this.tiltAngle = 0;
    this.angle = getRandomNumber(Math.PI * 2);
    this.count = count + 1;
    return this;
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
