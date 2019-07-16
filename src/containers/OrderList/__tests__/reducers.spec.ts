import { updatePendingOrders, startDeliveringOrder, orderDelivered } from '../actions';
import { orderListReducer } from '../reducers';
import { pending, delivering } from '@src/components/OrderList/__tests__/__fixture__/orders';

describe('MapBox Reducers', () => {
  it('should reduce correct state for updatePendingOrders', () => {
    const action = updatePendingOrders(pending);
    expect(orderListReducer(undefined, action)).toMatchSnapshot();
  });

  it('should reduce correct state for startDeliveringOrder', () => {
    const action = startDeliveringOrder(delivering[0]);
    expect(orderListReducer(undefined, action)).toMatchSnapshot();
  });

  it('should reduce correct state for orderDelivered', () => {
    const action1 = startDeliveringOrder(delivering[0]);
    const action2 = orderDelivered({
      ...delivering[0],
      endTime: new Date('2019-04-20T05:11:15.265Z'),
    });

    const state1 = orderListReducer(undefined, action1);
    expect(state1).toMatchSnapshot();
    const state2 = orderListReducer(state1, action2);
    expect(state2).toMatchSnapshot();
  });
});
