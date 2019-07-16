import configureStore from 'redux-mock-store';

import {
  fetchOriginGeocodingAction,
  setViewport,
  setDeliverSimulationStarted,
  setDeliverGeoFeatures,
} from '../actions';
import { fixtureData1 } from './__fixture__/geojson';

const mockStore = configureStore();
const store = mockStore();

describe('MapBox Actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should dispatch fetchOriginGeocodingAction', () => {
    store.dispatch(
      fetchOriginGeocodingAction.success({
        address: 'Home',
        coordinates: [-137, 37],
      })
    );
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch setViewport', () => {
    store.dispatch(
      setViewport({
        longitude: -137,
        latitude: 37,
        zoom: 11,
      })
    );
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch setDeliverSimulationStarted', () => {
    store.dispatch(setDeliverSimulationStarted(true));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch setDeliverGeoFeatures', () => {
    store.dispatch(setDeliverGeoFeatures([fixtureData1.route]));
    expect(store.getActions()).toMatchSnapshot();
  });
});
