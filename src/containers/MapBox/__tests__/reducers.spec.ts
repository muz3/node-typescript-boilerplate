import { fixtureData1 } from './__fixture__/geojson';
import {
  fetchOriginGeocodingAction,
  setViewport,
  setDeliverSimulationStarted,
  setDeliverGeoFeatures,
} from '../actions';
import { mapboxReducer } from '../reducers';

describe('MapBox Reducers', () => {
  it('should reduce correct state for fetchOriginGeocodingAction', () => {
    const action = fetchOriginGeocodingAction.success({
      address: 'Home',
      coordinates: [-137, 37],
    });
    expect(mapboxReducer(undefined, action)).toMatchSnapshot();
  });

  it('should reduce correct state for setViewport', () => {
    const action = setViewport({
      longitude: -137,
      latitude: 37,
      zoom: 11,
    });
    expect(mapboxReducer(undefined, action)).toMatchSnapshot();
  });

  it('should reduce correct state for setDeliverSimulationStarted', () => {
    const action = setDeliverSimulationStarted(true);
    expect(mapboxReducer(undefined, action)).toMatchSnapshot();
  });

  it('should reduce correct state for setDeliverGeoFeatures', () => {
    const action = setDeliverGeoFeatures([fixtureData1.route]);
    expect(mapboxReducer(undefined, action)).toMatchSnapshot();
  });
});
