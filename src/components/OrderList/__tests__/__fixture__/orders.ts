import { default as allOrders } from '@src/data/orders.json';
import { DeliveredOrder, DeliveringOrder, PendingOrder } from '@src/containers/OrderList/types';

export const orders = allOrders.slice(0, 10);
export const pending: PendingOrder[] = orders;
export const delivering: DeliveringOrder[] = allOrders
  .slice(10, 20)
  .map(({ dispatchTime, ...order }) => ({
    ...order,
    startTime: new Date('2019-04-20T05:01:15.265Z'),
    speed: 27 / 3600,
    distance: 1,
    route: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [[-118.46742, 34.00534], [-118.47105, 34.00321]],
      },
    },
    coordinates: [-130, 37],
  }));

export const delivered: DeliveredOrder[] = allOrders
  .slice(20, 25)
  .map(({ dispatchTime, ...order }) => ({
    ...order,
    startTime: new Date('2019-04-20T05:00:15.265Z'),
    speed: 27 / 3600,
    distance: 1,
    route: {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [[-118.46742, 34.00534], [-118.47105, 34.00321]],
      },
    },
    coordinates: [-130, 37],
    endTime: new Date('2019-04-20T05:11:15.265Z'),
  }));
