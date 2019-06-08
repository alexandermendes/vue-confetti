import { ImageParticle } from '../../../src/particles';
import { createParticleOptions } from '../../__mocks__';

describe('ImageParticle', () => {
  let options = null;
  let ctx = null;

  beforeEach(() => {
    options = createParticleOptions(ctx);
    ctx = options.canvas.ctx;
  });

  it('draws the image element', () => {
    const img = document.createElement('img');
    img.setAttribute('src', 'http://placekitten.com/50/50');

    const particle = new ImageParticle({}, img);
    particle.setup(options);

    particle.draw();

    expect(ctx.drawImage).toHaveBeenCalledTimes(1);
    expect(ctx.drawImage).toHaveBeenCalledWith(img, 0, 0);
  });
});
