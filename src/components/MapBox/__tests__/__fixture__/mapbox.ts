import { Props as MapBoxProps } from '../..';
import orders from '@src/data/orders.json';

export const props: MapBoxProps = {
  origin: {
    address: 'mock address',
    coordinates: [-130, 38],
  },
  viewport: {
    longitude: -130,
    latitude: 37,
    zoom: 11,
  },
  deliveringOrders: [
    {
      ...orders[0],
      startTime: new Date('2019-04-20T05:01:15.265Z'),
      speed: 22,
      distance: 2,
      route: {},
      coordinates: [-131, 37],
    },
  ],
  deliverSimulationStarted: false,
  mapStyle: {},

  setViewport: jest.fn(),
  fetchOriginOperation: jest.fn(),
};
