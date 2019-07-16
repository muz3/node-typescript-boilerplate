import { ThunkResult } from '@src/store';
import initialOrders from '@src/data/orders.json';
import { updatePendingOrders, setSimulatingOrdersStarted } from './actions';
import { tickOneSecond } from './utils';
import { fetchDestinationOperation } from '@src/containers/MapBox/operations';

/**
 * Start to update pending orders, subtract dispatchTime by 1 per one second
 */
export function startSimulatingOrders(): ThunkResult<void> {
  return function(dispatch, getState) {
    const { orderList } = getState();

    if (orderList.simulatingOrdersStarted) {
      return;
    }

    // when orderList does not have any data, we fetch it from initialOrders
    if (!orderList.pending.length && !orderList.delivering.length && !orderList.delivered.length) {
      initialOrders.sort((a, b) => a.dispatchTime - b.dispatchTime);
      dispatch(updatePendingOrders(initialOrders));
    }

    const interval = setInterval(() => {
      const { orderList } = getState();
      if (!orderList.pending.length) {
        clearInterval(interval);
        return;
      }

      // tick one second, update delivering and pending orders
      const { pending, delivering } = tickOneSecond(orderList.pending);
      dispatch(updatePendingOrders(pending));

      // if there is delivering order after one second tick
      // start an operation to fetch destination info
      if (delivering && delivering.length) {
        delivering.forEach(order => {
          dispatch(fetchDestinationOperation(order));
        });
      }
    }, 1000);

    dispatch(setSimulatingOrdersStarted(true));
  };
}
