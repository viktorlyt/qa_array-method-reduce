'use strict';

const { reduce } = require('./reduce');

describe('reduce', () => {
  beforeAll(() => {
    Array.prototype.reduce2 = reduce; // eslint-disable-line
  });

  afterAll(() => {
    delete Array.prototype.reduce2;
  });

  it('should call a cb once per item', () => {
    const items = [1, 2, 3];
    const f = jest.fn();

    items.reduce2(f, 1);
    expect(f).toHaveBeenCalledTimes(3);
  });

  it('no prev', () => {
    const items = [1, 2, 3];
    const f = jest.fn();

    items.reduce2(f);
    expect(f).toHaveBeenCalledTimes(2);
  });

  it('should call a cb for an empty array', () => {
    const f = jest.fn();

    [].reduce2(f);
    expect(f).not.toHaveBeenCalled();
  });

  it('should pass an el, an index and an array to a cb', () => {
    const f = jest.fn();

    const items = [100, 200, 300];

    items.reduce2(f);

    expect(f).toHaveBeenCalledWith(100, 200, 1, items);
  });

  it('should return smth', () => {
    const f = jest.fn();

    const items = [1, 2, 3];

    items.reduce2(f);

    expect(f).toHaveReturnedTimes(2);
  });

  it('should return smth', () => {
    const f = jest.fn();

    const items = [1, 2, 3];

    items.reduce2(f, 2);

    expect(f).toHaveReturnedTimes(3);
  });
});
