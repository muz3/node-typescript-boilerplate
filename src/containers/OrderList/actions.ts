import { ActionType, createStandardAction, createAsyncAction } from 'typesafe-actions';
import { DeliveringOrder, PendingOrder, DeliveredOrder } from './types';

/**
 * Action to update pending orders, mainly for dispatchTime
 */
export const updatePendingOrders = createStandardAction('@@OrderList/UPDATE_PENDING_ORDERS')<
  PendingOrder[]
>();

/**
 * Action to notify an order started to delvier
 */
export const startDeliveringOrder = createStandardAction('@@OrderList/START_DELIVERING_ORDER')<
  DeliveringOrder
>();

/**
 * Action to notify an order is delviered
 */
export const orderDelivered = createStandardAction('@@OrderList/ORDER_DELIVERED')<DeliveredOrder>();

/**
 * Three actions for sending request to fetch destination geocoding
 * request, success, failure
 */
export const fetchDestinationAction = createAsyncAction(
  '@@OrderList/FETCH_DEST_REQUEST',
  '@@OrderList/FETCH_DEST_SUCCESS',
  '@@OrderList/FETCH_DEST_FAILURE'
)<undefined, DeliveringOrder, Error>();

export const setSimulatingOrdersStarted = createStandardAction(
  '@@OrderList/SIMULATING_ORDERS_STARTED'
)<boolean>();

export type OrderListAction =
  | ActionType<typeof updatePendingOrders>
  | ActionType<typeof startDeliveringOrder>
  | ActionType<typeof orderDelivered>
  | ActionType<typeof fetchDestinationAction>
  | ActionType<typeof setSimulatingOrdersStarted>;
