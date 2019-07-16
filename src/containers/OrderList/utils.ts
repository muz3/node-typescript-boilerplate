import { groupBy } from '@src/utils/array';
import { PendingOrder } from './types';

/**
 * reduce all orders' dispatchTime by 1 second,
 * move them to delivering if dispatchTime is 0
 *
 * @param orders - pending orders
 * @returns
 */
export function tickOneSecond(orders: PendingOrder[]) {
  const updatedOrders = orders.map(order => ({
    ...order,
    dispatchTime: order.dispatchTime - 1,
  }));

  const { true: delivering = [], false: pending = [] } = groupBy(
    updatedOrders,
    ({ dispatchTime }) => dispatchTime === 0
  );

  return {
    delivering,
    pending,
  };
}
