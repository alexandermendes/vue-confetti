import Confetti from '../../src/confetti';

describe('Confetti', () => {
  it('is initialised with default settings', () => {
    const confetti = new Confetti();

    expect(confetti).toMatchSnapshot();
  });

  it('does not throw when started without options', () => {
    const confetti = new Confetti();

    expect(() => confetti.start()).not.toThrow();
  });
});
