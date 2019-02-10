import Particles from './particles';

class Confetti {
  /**
   * Initialise.
   */
  constructor() {
    this.setDefaults();
    this.onResizeCallback = this.updateDimensions.bind(this);
  }

  /**
   * Initialize default.
   */
  setDefaults() {
    this.canvas = null;
    this.ctx = null;
    this.W = 0;
    this.H = 0;
    this.particles = {};
    this.droppedCount = 0;
    this.particlesPerFrame = 1.5;
    this.wind = 0;
    this.windSpeed = 1;
    this.windSpeedMax = 1;
    this.windChange = 0.01;
    this.windPosCoef = 0.002;
    this.maxParticlesPerFrame = 2; // max particles dropped per frame
    this.animationId = null;
  }

  particleOptions(opts) {
    return {
      ctx: this.ctx,
      W: this.W,
      H: this.H,
      size: opts.size || 10,
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
          'Crimson',
        ],
        idx: 0,
        step: 10,
        get color() {
          this.idx += 1;
          return this.opts[((this.idx) / this.step | 0) % this.opts.length]; // eslint-disable-line
        },
      },
    };
  }

  /**
   * Create the confetti particles.
   * @param {Object} opts
   *   The particle options.
   */
  createParticles(opts = {}) {
    const particleOpts = this.particleOptions(opts);
    this.particles = new Particles(particleOpts);
  }

  /**
   * Add a fixed, full-screen canvas to the page.
   */
  createContext() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.display = 'block';
    this.canvas.style.position = 'fixed';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.top = 0;
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.id = 'confetti-canvas';
    document.querySelector('body').appendChild(this.canvas);
  }

  /**
   * Start dropping confetti.
   * @param {Object} opts
   *   The particle options.
   */
  start(opts) {
    if (!this.ctx) {
      this.createContext();
    }

    if (this.animationId) {
      cancelAnimationFrame(this.animationId); // Cancel any previous loop
    }

    this.createParticles(opts);
    this.updateDimensions();
    this.particlesPerFrame = this.maxParticlesPerFrame;
    this.animationId = requestAnimationFrame(this.mainLoop.bind(this));
    window.addEventListener('resize', this.onResizeCallback);
  }

  /**
   * Stop dropping confetti.
   */
  stop() {
    this.particlesPerFrame = 0;
    window.removeEventListener('resize', this.onResizeCallback);
  }

  /**
   * Update the confetti options.
   */
  update(opts) {
    this.particles.opts = this.particleOptions(opts);
  }

  /**
   * Remove confetti.
   */
  remove() {
    this.stop();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      document.body.removeChild(this.canvas);
    }
    this.setDefaults();
  }

  /**
   * Update the dimensions, if necessary.
   */
  updateDimensions() {
    if (this.W !== window.innerWidth || this.H !== window.innerHeight) {
      this.W = this.particles.opts.W = this.canvas.width = window.innerWidth; // eslint-disable-line
      this.H = this.particles.opts.H = this.canvas.height = window.innerHeight; // eslint-disable-line
    }
  }

  /**
   * Run the main animation loop.
   */
  mainLoop(time) {
    this.updateDimensions();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.windSpeed = Math.sin(time / 8000) * this.windSpeedMax;
    this.wind = this.particles.opts.wind += this.windChange; // eslint-disable-line

    while (this.droppedCount < this.particlesPerFrame) {
      this.droppedCount += 1;
      this.particles.add();
    }

    this.droppedCount -= this.particlesPerFrame;
    this.particles.update();
    this.particles.draw();

    // Stop calling if no particles left in view (i.e. it's been stopped)
    if (this.particles.items.length) {
      this.animationId = requestAnimationFrame(this.mainLoop.bind(this));
    }
  }
}

export default Confetti;
