import { CircleParticle } from '../../../src/particles';
import { createParticleOptions } from '../../__mocks__';

describe('CircleParticle', () => {
  let options = null;
  let ctx = null;

  beforeEach(() => {
    options = createParticleOptions(ctx);
    ctx = options.canvas.ctx;
  });

  it('is drawn as expected', () => {
    const particle = new CircleParticle();
    particle.setup(options);

    particle.draw();

    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(ctx.arc).toHaveBeenCalledWith(0, 0, (particle.particleSize / 2), 0, Math.PI * 2, false);
    expect(ctx.fill).toHaveBeenCalledTimes(1);
  });
});
