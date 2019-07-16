import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchDestinationOperation } from '@src/containers/MapBox/operations';
import { createInitialState } from '@src/utils/test-helper';
import { pending } from '@src/components/OrderList/__tests__/__fixture__/orders';
import { startSimulatingOrders } from '../operations';

const rootState = createInitialState();
const mockStore = configureStore([thunk]);

jest.useFakeTimers();
jest.mock('@src/containers/MapBox/operations');

describe('OrderList Operations', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('#fetchOriginOperation', () => {
    it('should dispatch correctly when no pending', () => {
      const store = mockStore(rootState);
      store.dispatch<any>(startSimulatingOrders());
      expect(store.getActions()).toMatchSnapshot();

      // tick one second
      jest.runTimersToTime(1000);
      expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    it('should dispatch correctly when pending, delivering exist', () => {
      const store = mockStore({
        ...rootState,
        orderList: {
          ...rootState.orderList,
          pending,
        },
      });
      store.dispatch<any>(startSimulatingOrders());
      jest.runTimersToTime(1000);

      expect(store.getActions()).toMatchSnapshot();
    });

    it('should dispatch correctly when there is new delivering', () => {
      const updatedPending = [...pending];
      updatedPending[0] = {
        ...updatedPending[0],
        dispatchTime: 1,
      };
      const store = mockStore({
        ...rootState,
        orderList: {
          ...rootState.orderList,
          pending: updatedPending,
        },
      });

      (fetchDestinationOperation as jest.Mock<any>).mockReturnValue({
        type: 'mock',
      });
      store.dispatch<any>(startSimulatingOrders());
      jest.runTimersToTime(1000);

      expect(fetchDestinationOperation).toHaveBeenCalledWith({
        ...updatedPending[0],
        dispatchTime: 0,
      });
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
