import { pending } from '@src/components/OrderList/__tests__/__fixture__/orders';
import { tickOneSecond } from '../utils';

describe('OrderList Utils', () => {
  describe('#tickOneSecond', () => {
    it('should update dispatchTime correctly', () => {
      const updatedOrders = tickOneSecond(pending);
      expect(updatedOrders).toMatchSnapshot();
    });
  });
});
