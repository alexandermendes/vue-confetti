import { RectParticle } from '../../../src/particles';
import { createParticleOptions } from '../../__mocks__';

describe('RectParticle', () => {
  let options = null;
  let ctx = null;

  beforeEach(() => {
    options = createParticleOptions(ctx);
    ctx = options.canvas.ctx;
  });

  it('is drawn as expected', () => {
    const particle = new RectParticle();
    particle.setup(options);

    particle.draw();

    expect(ctx.fillRect).toHaveBeenCalledTimes(1);
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, particle.particleSize, particle.particleSize / 2);
  });
});
