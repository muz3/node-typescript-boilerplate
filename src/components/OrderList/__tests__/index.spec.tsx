import React from 'react';

import { mountWithTheme } from '@src/utils/test-helper';
import { pending, delivering, delivered } from './__fixture__/orders';
import OrderList from '..';

describe('Component OrderList', () => {
  it('should render OrderList correctly', () => {
    const startSimulatingOrders = jest.fn();
    // shallow does not really support useEffect yet
    // so using mountWithTheme instead
    // https://github.com/airbnb/enzyme/issues/2011
    const component = mountWithTheme(
      <OrderList
        pending={pending}
        delivering={delivering}
        delivered={delivered}
        simulatingOrdersStarted={false}
        startSimulatingOrders={startSimulatingOrders}
      />
    );

    expect(startSimulatingOrders).toHaveBeenCalledTimes(1);
    expect(component).toMatchSnapshot();
  });
});
