import { groupBy } from '../array';

describe('Utils', () => {
  describe('#array', () => {
    it('should group an array by passed in func return value', () => {
      const arr = [{ type: 'A', id: 1 }, { type: 'B', id: 2 }, { type: 'A', id: 3 }];
      const result = groupBy(arr, ({ type }) => type);
      expect(result).toEqual({
        A: [{ type: 'A', id: 1 }, { type: 'A', id: 3 }],
        B: [{ type: 'B', id: 2 }],
      });
    });
  });
});
