import Particle from '../../src/particle';

describe('Particle', () => {
  let canvas = null;
  let ctx = null;
  let options = null;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;
    options = {
      ctx,
      colors: {
        opts: [
          'red',
          'yellow',
          'blue',
        ],
        idx: 0,
        step: 10,
        get color () {
          return this.opts[((this.idx++) / this.step | 0) % this.opts.length]
        }
      },
    };
  });

  it('draws a rectangle', () => {
    const particle = new Particle();
    particle.setup(options);

    particle.drawRect();

    expect(ctx.fillRect).toHaveBeenCalledTimes(1);
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, particle.r, particle.r / 2);
  });

  it('draws a circle', () => {
    const particle = new Particle();
    particle.setup(options);

    particle.drawCircle();

    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(ctx.arc).toHaveBeenCalledWith(0, 0, (particle.r / 2), 0, Math.PI * 2, false);
    expect(ctx.fill).toHaveBeenCalledTimes(1);
  });
});
