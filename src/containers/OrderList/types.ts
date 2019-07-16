import { Omit } from '@src/types/utils';

export type PendingOrder = {
  id: string;
  name: string;
  destination: string;
  dispatchTime: number;
};

export type DeliveringOrder = Omit<PendingOrder, 'dispatchTime'> & {
  startTime: Date;
  speed: number;
  distance: number;
  route: any;
  coordinates: number[];
};

export type DeliveredOrder = DeliveringOrder & {
  endTime: Date;
};

/**
 * OrderList State
 *
 * Q: Why having three different arrays?
 * A: It might make sense to use one array to represent orders, and use a status
 * field to indicating if it's pending/delivering/delivered.
 * However there're drawbacks:
 * 1. when you just want to update one specific status' orders, you have to loop
 *    through the whole array. If the order has a lot, it could be a performance
 *    downside. (Even with reselect, we still have to loop through the array.)
 * 2. there're some data we don't know in the beginning, making the typing
 *    system have to use `?` or `null`. This is actually not very convenient in
 *    a lot of cases
 * So instead of using one array, we use three different arrays.
 */
export type OrderListState = {
  pending: PendingOrder[];

  delivering: DeliveringOrder[];

  delivered: DeliveredOrder[];

  simulatingOrdersStarted: boolean;
};
