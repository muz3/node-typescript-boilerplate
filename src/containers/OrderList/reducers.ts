import { OrderListState } from './types';
import {
  OrderListAction,
  updatePendingOrders,
  startDeliveringOrder,
  orderDelivered,
  setSimulatingOrdersStarted,
} from './actions';
import { getType } from 'typesafe-actions';

const defaultState: OrderListState = {
  pending: [],
  delivering: [],
  delivered: [],
  simulatingOrdersStarted: false,
};

export function orderListReducer(state = defaultState, action: OrderListAction): OrderListState {
  switch (action.type) {
    case getType(updatePendingOrders):
      return {
        ...state,
        pending: action.payload,
      };
    case getType(startDeliveringOrder):
      return {
        ...state,
        delivering: [action.payload, ...state.delivering],
      };
    case getType(orderDelivered):
      return {
        ...state,
        // remove from delivering using the delivered order's id
        delivering: state.delivering.filter(({ id }) => id !== action.payload.id),
        delivered: [action.payload, ...state.delivered],
      };
    case getType(setSimulatingOrdersStarted):
      return {
        ...state,
        simulatingOrdersStarted: action.payload,
      };
    default:
      return state;
  }
}
