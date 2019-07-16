import configureStore from 'redux-mock-store';

import {
  delivering,
  pending,
  delivered,
} from '@src/components/OrderList/__tests__/__fixture__/orders';
import {
  updatePendingOrders,
  startDeliveringOrder,
  orderDelivered,
  fetchDestinationAction,
} from '../actions';

const mockStore = configureStore();
const store = mockStore();

describe('OrderList Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should dispatch updatePendingOrders', () => {
    store.dispatch(updatePendingOrders(pending));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch startDeliveringOrder', () => {
    store.dispatch(startDeliveringOrder(delivering[0]));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch orderDelivered', () => {
    store.dispatch(orderDelivered(delivered[0]));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch fetchDestinationAction', () => {
    store.dispatch(fetchDestinationAction.request());
    expect(store.getActions()).toMatchSnapshot();
  });
});
