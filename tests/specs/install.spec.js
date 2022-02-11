import plugin from '../../src';
import Confetti from '../../src/confetti';

jest.mock('../../src/confetti');

describe('Install', () => {
  afterEach(() => {
    plugin.installed = false;
  });

  it('supports Vue 3', () => {
    const app = { config: { globalProperties: {} } };
    const options = { foo: 'bar' };

    plugin.install(app, options);

    expect(app.config.globalProperties.$confetti).toBeInstanceOf(Confetti);
    expect(Confetti).toHaveBeenCalledTimes(1);
    expect(Confetti).toHaveBeenCalledWith(options);
  });

  it('supports Vue 2', () => {
    const app = { prototype: {} };
    const options = { foo: 'bar' };

    plugin.install(app, options);

    expect(app.prototype.$confetti).toBeInstanceOf(Confetti);
    expect(Confetti).toHaveBeenCalledTimes(1);
    expect(Confetti).toHaveBeenCalledWith(options);
  });
});
