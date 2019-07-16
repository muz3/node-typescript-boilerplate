import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { createInitialState } from '@src/utils/test-helper';
import { MAPBOX_API_URL, ANIMATION_INTERVAL } from '@src/containers/MapBox/constants';
import { delivering, pending } from '@src/components/OrderList/__tests__/__fixture__/orders';
import { fixtureData1 } from './__fixture__/geojson';
import {
  fetchOriginOperation,
  fetchDestinationOperation,
  startSimulatingDeliver,
} from '../operations';
import * as utils from '../utils';

const mockStore = configureStore([thunk]);
const rootState = createInitialState();
const store = mockStore(rootState);

const _Date = Date;
jest.useFakeTimers();

describe('MapBox Actions', () => {
  beforeAll(() => {
    fetchMock.get(`begin:${MAPBOX_API_URL}\/geocoding`, {
      features: [
        {
          center: [-137, 32],
        },
      ],
    });

    fetchMock.get(`begin:${MAPBOX_API_URL}\/directions`, {
      routes: [
        {
          geometry: fixtureData1.geometry,
        },
      ],
    });

    (utils.generateRandomSpeed as any) = jest.fn(() => 42 / 3600);

    const someDate = new Date('2019-04-20T05:09:15.265Z');
    (global as any).Date = jest.fn(() => someDate);
    (global as any).Date.now = jest.fn(() => someDate.valueOf());
  });

  afterAll(() => {
    fetchMock.reset();
    (global as any).Date = _Date;
  });

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    // clear all timers in case it leak
    jest.clearAllTimers();
  });

  it('should dispatch correctly for fetchOriginOperation', async () => {
    await store.dispatch<any>(fetchOriginOperation());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch correctly for fetchDestinationOperation', async () => {
    // first time we start simulation
    await store.dispatch<any>(fetchDestinationOperation(pending[0]));

    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch correctly for startSimulatingDeliver', async () => {
    const state: any = store.getState();
    // mock orderList
    const oldOrderList = state.orderList;
    state.orderList = {
      delivering,
      pending: [],
    };

    const getTime = (start: number, add: number) => {
      let count = 0;
      return () => {
        count += 1;
        return count * add + start;
      };
    };
    (global as any).Date.now = jest.fn(getTime(delivering[0].startTime.valueOf(), 2000));
    store.dispatch<any>(startSimulatingDeliver());

    jest.runTimersToTime(ANIMATION_INTERVAL * 5);

    expect(store.getActions()).toMatchSnapshot();
    state.orderList = oldOrderList;
  });

  it('should dispatch delivered if reached', async () => {
    const state: any = store.getState();
    // mock orderList
    const oldOrderList = state.orderList;
    state.orderList = {
      delivering,
      pending: [],
    };

    (global as any).Date.now = jest.fn(() => delivering[0].startTime.valueOf() + 200 * 1000);
    store.dispatch<any>(startSimulatingDeliver());

    jest.runTimersToTime(ANIMATION_INTERVAL);

    expect(store.getActions()).toMatchSnapshot();

    // restore orderList
    state.orderList = oldOrderList;
  });

  it('should clearInterval when no delivering and pending', async () => {
    store.dispatch<any>(startSimulatingDeliver());

    jest.runTimersToTime(ANIMATION_INTERVAL + 1);
    expect(clearInterval).toHaveBeenCalledTimes(1);

    expect(store.getActions()).toMatchSnapshot();
  });
});
