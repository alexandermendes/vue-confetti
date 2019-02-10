import { mockRandom, resetMockRandom } from 'jest-mock-random';
import getRandomNumber from '../../../src/utils/get-random-number';

describe('getRandomNumber', () => {
  beforeEach(() => {
    resetMockRandom();
  });

  it('returns a minimum of 1 by default', () => {
    mockRandom([0.1]);
    const n = getRandomNumber();
    expect(n).toEqual(1.1);
  });

  it('returns the minimum number', () => {
    mockRandom([0.1]);
    const n = getRandomNumber(2);
    expect(n).toEqual(2.1);
  });

  it('returns the maxiumum number', () => {
    mockRandom([0.9]);
    const n = getRandomNumber(2, 10);
    expect(n).toEqual(9.2);
  });

  it('rounds integers if asked to', () => {
    mockRandom([0.1]);
    const n = getRandomNumber(0, 1, true);
    expect(n).toEqual(0);
  });

  it('still returns correct value when strings passed', () => {
    mockRandom([0.1]);
    const n = getRandomNumber('2', '10');
    const m = getRandomNumber(2, 10);
    expect(n).toEqual(m);
  });
});
