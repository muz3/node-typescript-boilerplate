import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';

import { mapboxReducer } from '@src/containers/MapBox/reducers';
import { orderListReducer } from '@src/containers/OrderList/reducers';

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    mapbox: mapboxReducer,
    orderList: orderListReducer,
  });
